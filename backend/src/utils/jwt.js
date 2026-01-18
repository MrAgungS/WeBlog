import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { loadEnv } from '../config/env.js';

loadEnv();

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id:user.id, 
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES || "15m"},
    )
}
export const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
}
export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}