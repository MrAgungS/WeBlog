import bcrypt from 'bcrypt';

import prisma from '../lib/prisma';
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
        return response(500,"Server Error", null, res)
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
        return response(500,"Server Error", null, res)
    }
}
export const refresh = async (req, res) => {
    
}
export const logout = async (req, res) => {
    
}