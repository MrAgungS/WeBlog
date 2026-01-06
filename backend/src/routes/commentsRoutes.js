import express from "express";
import { createComments, deleteComments, getComments } from "../controllers/commentsControllers";

const router = express.Router();

router.post("/",createComments);
router.get("/:postId", getComments);
router.delete("/:id", deleteComments);

export default router