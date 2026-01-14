import express from "express"
import { categories } from "../controllers/categoriesControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/", verifyAccesssToken, apiRateLimitMiddleware, categories);

export default router