import { z } from "zod";

const tagsSchema = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}, z.array(z.string().trim().min(1).max(32)).max(8));

export const blogSchema = z.object({
  title: z.string().trim().min(3).max(140),
  excerpt: z.string().trim().min(10).max(240),
  content: z.string().trim().min(40),
  tags: tagsSchema,
  status: z.enum(["draft", "published"]).default("draft")
});

export const blogUpdateSchema = blogSchema.partial();

export const commentSchema = z.object({
  body: z.string().trim().min(1).max(1000)
});
