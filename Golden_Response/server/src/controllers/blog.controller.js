import mongoose from "mongoose";
import slugify from "slugify";
import Blog from "../models/Blog.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { blogSchema, blogUpdateSchema, commentSchema } from "../validators/blog.validators.js";

const publicPopulate = [
  { path: "author", select: "name email bio" },
  { path: "comments.author", select: "name" }
];

function imagePath(req) {
  return req.file ? `/uploads/${req.file.filename}` : undefined;
}

async function uniqueSlug(title, excludedId = null) {
  const base = slugify(title, { lower: true, strict: true, trim: true }) || "post";
  let slug = base;
  let suffix = 1;
  const query = (candidate) => ({
    slug: candidate,
    ...(excludedId ? { _id: { $ne: excludedId } } : {})
  });

  while (await Blog.exists(query(slug))) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  return slug;
}

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog ID");
  }
}

function ensureOwner(blog, user) {
  if (blog.author.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "You are not allowed to modify this blog");
  }
}

export const listBlogs = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 9), 1), 30);
  const filter = { status: "published" };

  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.search) filter.$text = { $search: req.query.search };

  const [items, total] = await Promise.all([
    Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "name email bio")
      .lean(),
    Blog.countDocuments(filter)
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const listMine = asyncHandler(async (req, res) => {
  const items = await Blog.find({ author: req.user._id })
    .sort({ updatedAt: -1 })
    .populate("author", "name email bio")
    .lean();

  res.json({ items });
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate(publicPopulate);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.status !== "published" && blog.author._id.toString() !== req.user?._id?.toString()) {
    throw new ApiError(404, "Blog not found");
  }

  res.json({ blog });
});

export const createBlog = asyncHandler(async (req, res) => {
  const data = blogSchema.parse(req.body);
  const slug = await uniqueSlug(data.title);
  const coverImage = imagePath(req);
  const blog = await Blog.create({
    ...data,
    slug,
    coverImage: coverImage || "",
    author: req.user._id,
    publishedAt: data.status === "published" ? new Date() : null
  });

  await blog.populate("author", "name email bio");
  res.status(201).json({ blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const data = blogUpdateSchema.parse(req.body);
  const blog = await Blog.findById(req.params.id);

  if (!blog) throw new ApiError(404, "Blog not found");
  ensureOwner(blog, req.user);

  if (data.title && data.title !== blog.title) {
    blog.slug = await uniqueSlug(data.title, blog._id);
  }

  Object.assign(blog, data);
  const coverImage = imagePath(req);
  if (coverImage) blog.coverImage = coverImage;
  if (data.status === "published" && !blog.publishedAt) blog.publishedAt = new Date();
  if (data.status === "draft") blog.publishedAt = null;

  await blog.save();
  await blog.populate(publicPopulate);
  res.json({ blog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const blog = await Blog.findById(req.params.id);

  if (!blog) throw new ApiError(404, "Blog not found");
  ensureOwner(blog, req.user);

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
});

export const toggleLike = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.status !== "published") throw new ApiError(404, "Blog not found");

  const hasLiked = blog.likes.some((id) => id.toString() === req.user._id.toString());
  blog.likes = hasLiked
    ? blog.likes.filter((id) => id.toString() !== req.user._id.toString())
    : [...blog.likes, req.user._id];

  await blog.save();
  res.json({ likes: blog.likes.length, liked: !hasLiked });
});

export const addComment = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const data = commentSchema.parse(req.body);
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.status !== "published") throw new ApiError(404, "Blog not found");

  blog.comments.push({ body: data.body, author: req.user._id });
  await blog.save();
  await blog.populate(publicPopulate);
  res.status(201).json({ comments: blog.comments });
});

export const deleteComment = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  const comment = blog.comments.id(req.params.commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  const canDelete =
    comment.author.toString() === req.user._id.toString() ||
    blog.author.toString() === req.user._id.toString() ||
    req.user.role === "admin";

  if (!canDelete) throw new ApiError(403, "You are not allowed to delete this comment");

  comment.deleteOne();
  await blog.save();
  await blog.populate(publicPopulate);
  res.json({ comments: blog.comments });
});
