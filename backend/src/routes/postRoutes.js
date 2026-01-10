import express from "express";
import { createPost, deletePost, getPost, getPostById, updatePost } from "../controllers/postControllers";
import { verifyAccesssToken } from "../middleware/verifyAccessToken";

const router = express.Router();

router.get("/", verifyAccesssToken, getPost);
router.post("/", verifyAccesssToken, createPost);
router.get("/:slug", verifyAccesssToken, getPostById);
router.put("/:id", verifyAccesssToken, updatePost);
router.delete("/:id", verifyAccesssToken, deletePost);

export default router