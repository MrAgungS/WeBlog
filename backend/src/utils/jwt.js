import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { loadEnv } from '../config/env';

loadEnv();

export const generateAccessToken = (user) => {
    jwt.sign(
        {id:user.id, role:role.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES},
    )
}
export const generateRefreshToken = () => {
    crypto.randomBytes(64).toString("hex");
}
export const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");