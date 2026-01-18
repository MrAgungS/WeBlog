import express from "express"
import { createCategories, getCategories } from "../controllers/categoriesControllers.js";
import { verifyAccesssToken } from "../middleware/verifyAccessToken.js";
import { apiRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/get/", verifyAccesssToken, apiRateLimitMiddleware, getCategories);
router.post("/create/", verifyAccesssToken, apiRateLimitMiddleware, createCategories)

export default router