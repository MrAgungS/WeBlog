import express from "express";
import { createPost, deletePost, getPost, getPostBySLug, updatePost } from "../controllers/postControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/id/:id", verifyAccesssToken, apiRateLimitMiddleware, getPost);
router.post("/create/", verifyAccesssToken, apiRateLimitMiddleware, createPost);
router.get("/slug/:slug", verifyAccesssToken, apiRateLimitMiddleware, getPostBySLug);
router.put("/update/:id", verifyAccesssToken, apiRateLimitMiddleware, updatePost);
router.delete("/delete/:id", verifyAccesssToken, apiRateLimitMiddleware, deletePost);
 
export default router