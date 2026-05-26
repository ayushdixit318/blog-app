import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 240
    },
    content: {
      type: String,
      required: true,
      minlength: 40
    },
    coverImage: {
      type: String,
      default: ""
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comments: [commentSchema],
    publishedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });

export default mongoose.model("Blog", blogSchema);
