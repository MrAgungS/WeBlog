import express from "express";
import { createComments, deleteComments, getComments } from "../controllers/commentsControllers";
import { verifyAccesssToken } from "../middleware/verifyAccessToken";

const router = express.Router();

router.post("/", verifyAccesssToken, createComments);
router.get("/:postId", verifyAccesssToken, getComments);
router.delete("/:id", verifyAccesssToken, deleteComments);

export default router