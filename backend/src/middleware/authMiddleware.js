import jwt from "jsonwebtoken";
import { loadEnv } from "../config/env.js";
import response from "../res/responses.js";

loadEnv();

export const authMiddlewere = (req, res, next) =>{
    const auth = req.headers.authorization;
    if(!auth) return response(401,"Check Auth", null, res)
    const token = auth.split(" ")[1];
    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );
        req.user.id = {
            id:payload.sub,
            role:payload.role,
        };
        next();
    } catch (error) {
        return response(401,"Check Auth", null, res)
    }
}