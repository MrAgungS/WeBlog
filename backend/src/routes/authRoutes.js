import express from "express"
import { login, logout, refresh, register } from "../controllers/authControllers.js";
import { authMiddlewere } from "../middleware/authMiddleware.js";
import { loginRateLimitMiddleware, registerRateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", registerRateLimitMiddleware, register);
router.post("/login", loginRateLimitMiddleware, login);
router.post("/refresh", refresh);
router.post("/logout", authMiddlewere, logout);

export default router