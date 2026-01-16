import express from "express"
import { getCategories } from "../controllers/categoriesControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/", verifyAccesssToken, apiRateLimitMiddleware, getCategories);

export default router