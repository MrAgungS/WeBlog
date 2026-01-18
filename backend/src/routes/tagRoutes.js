import express from "express"
import { createTag, getTag } from "../controllers/tagControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/get/", verifyAccesssToken, apiRateLimitMiddleware, getTag);
router.post("/create/", verifyAccesssToken, apiRateLimitMiddleware, createTag)

export default router