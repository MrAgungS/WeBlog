import express from "express"
import { getTag } from "../controllers/tagControllers";

const router = express.Router();

router.get("/", getTag);

export default router