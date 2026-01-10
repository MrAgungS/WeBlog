import bcrypt from 'bcrypt';

import prisma from '../lib/prisma.js';
import { registerValidation } from '../validations/auth.validation.js';
import response from '../res/responses.js';
import { generateAccessToken, generateRefreshToken, hashToken } from '../utils/jwt.js';

export const register = async (req, res) => {
    try {
        // Check Validation
        const error = registerValidation(req.body);
        if (error) {
            return response(400,error,null,res)
        }
        const { name, email, password } = req.body;
        // Check Email
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return response(409,"Email has been registered",null,res)
        };
        const hash = await bcrypt.hash(password, 9);
        const user = await prisma.user.create({
            data:{
                name,email, password: hash
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
            }
        });
        return response(201,"Registration successful",user,res);
    } catch (error) {
        console.error("Register Error : ",error);
        return response(500,"Register Error", null, res)
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        // Cheack Email
        const user = await prisma.user.findUnique({ where : {email} });
        if (!user) {
            return response(401,"Cannot find the Email",null, res);
        };
        // Check Password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response(401,"Wrong Password",null,res);
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();

        await prisma.refreshToken.create({
            data:{
                token: hashToken(refreshToken),
                user_id: user.id,
                expiresAt: new Date(Date.now() + 7 * 86400000)
            }
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 86400000
        }).json({ accessToken })
    } catch (error) {
        console.error("Login Error : ",error);
        return response(500,"Login Error", null, res)
    }
}
export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) return response(401,"Unauthorized refresh ".null. res);
        const tokenHash = hashToken(token);
        const stored =await prisma.refreshToken.findFirst({
            where : {tokenHash, revoked:false}
        });
        //reused detection
        if (!stored) {
            await prisma.updateMany({
                where : {revoked: false},
                data : {revoked: true}
            });
            return response(403,"Forbidden reused ", null, res);
        };
        // revoke old token
        await prisma.refreshToken.update({
            where : {id: stored.id},
            data : {revoked:true }
        });
        // issue new pair
        const user = await prisma.user.findUnique({
            where : {id : stored.user_id}
        });
        const newAccess = generateAccessToken(user);
        const newRefresh = generateRefreshToken();
        await prisma.refreshToken.create({
            data: {
                tokenHash: hashToken(newRefresh),
                user_id: user.id,
                expiresAt: new Date(Date.now() + 7 *  86400000)
            }
        });
        res.cookie("refreshToken", newRefresh, {
            httpOnly: true,
            secure : true,
            sameSite : "strict",
            maxAge: 7 * 86400000,
        }).json({accessToken: newAccess})
    } catch (error) {
        console.error("Refresh Error : ",error);
        return response(500,"Refresh server Error", null, res)
    }
}
export const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return response(209,"logout token error",null,res);
        await prisma.refreshToken.updateMany({
            where : {tokenHash: hashToken(token)},
            data: {revoked: true}
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure : true,
            sameSite : "strict",            
        }).json({massage: "Logout Success"})
    } catch (error) {
        console.error("Logout Error : ",error);
        return response(500,"Logout server Error", null, res)        
    }
}