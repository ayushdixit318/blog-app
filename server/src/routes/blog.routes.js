import { Router } from "express";
import {
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  getBlog,
  listBlogs,
  listMine,
  toggleLike,
  updateBlog
} from "../controllers/blog.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadCover } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", listBlogs);
router.get("/mine", protect, listMine);
router.post("/", protect, uploadCover, createBlog);
router.get("/:slug", getBlog);
router.patch("/:id", protect, uploadCover, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comments", protect, addComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

export default router;
