import express from "express"
import { categories } from "../controllers/categoriesControllers";
import { verifyAccesssToken } from "../middleware/verifyAccessToken";

const router = express.Router();

router.get("/", verifyAccesssToken, categories);

export default router