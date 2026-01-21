import express from "express";
import { createComments, deleteComments, getComments } from "../controllers/commentsControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/:postId/createcomments", verifyAccesssToken, apiRateLimitMiddleware, createComments);
router.get("/postid/:postId", verifyAccesssToken, apiRateLimitMiddleware, getComments);
router.delete("/:id/deletecomments", verifyAccesssToken, apiRateLimitMiddleware, deleteComments);

export default router