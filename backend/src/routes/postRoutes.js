import express from "express";
import { createPost, deletePost, getPost, getPostById, updatePost } from "../controllers/postControllers";

const router = express.Router();

router.get("/", getPost);
router.post("/", createPost);
router.get("/:slug", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router