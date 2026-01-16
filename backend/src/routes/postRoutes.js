import express from "express";
import { createPost, deletePost, getPost, getPostBySLug, updatePost } from "../controllers/postControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/", verifyAccesssToken, apiRateLimitMiddleware, getPost);
router.post("/", verifyAccesssToken, apiRateLimitMiddleware, createPost);
router.get("/:slug", verifyAccesssToken, apiRateLimitMiddleware, getPostBySLug);
router.put("/:id", verifyAccesssToken, apiRateLimitMiddleware, updatePost);
router.delete("/:id", verifyAccesssToken, apiRateLimitMiddleware, deletePost);
 
export default router