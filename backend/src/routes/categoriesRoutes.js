import express from "express"
import { categories } from "../controllers/categoriesControllers";

const router = express.Router();

router.get("/", categories);

export default router