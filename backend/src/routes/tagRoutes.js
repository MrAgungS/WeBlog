import express from "express"
import { getTag } from "../controllers/tagControllers";
import { verifyAccesssToken } from "../middleware/verifyAccessToken";

const router = express.Router();

router.get("/", verifyAccesssToken, getTag);

export default router