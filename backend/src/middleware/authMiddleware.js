import jwt from "jsonwebtoken";
import response from "../res/responses.js";
import { loadEnv } from "../config/env.js";

loadEnv();
export const authMiddlewere = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return response(401, "Unauthorized", null, res);
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(
        token,
        process.env.JWT_SECRET
        );
        req.user = {
        id: payload.sub,
        role: payload.role
        };
        next();
    } catch (err) {
        console.error("JWT ERROR:", err.name, err.message);
        return response(401, "Invalid or expired token", null, res);
    }
    };
