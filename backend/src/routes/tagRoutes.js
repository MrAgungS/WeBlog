import express from "express"
import { getTag } from "../controllers/tagControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/", verifyAccesssToken, apiRateLimitMiddleware, getTag);

export default router