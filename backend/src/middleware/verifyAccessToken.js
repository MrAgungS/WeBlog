import jwt from "jsonwebtoken"
import { loadEnv } from "../config/env.js"
import response from "../res/responses.js";

loadEnv();
export const verifyAccesssToken = (req,res,next) =>{
    const auth = req.headers.authorization;
    if(!auth) return response(401, "Unauthorized auth verify", null, res);
    const token =auth.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(err, decoded) =>{
        if(err) return response(403,"Forbidden verify");
        req.user = decoded;
        next();
    });
};