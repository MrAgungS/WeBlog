import express from "express";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";
import { likePost, unlikePost } from "../controllers/likeControllers.js";

const router = express.Router();

router.post("/:id/like", verifyAccesssToken, apiRateLimitMiddleware, likePost);
router.delete("/:id/like", verifyAccesssToken, apiRateLimitMiddleware, unlikePost);

export default router;