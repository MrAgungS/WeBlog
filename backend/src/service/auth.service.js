import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { registerValidation } from '../validations/auth.validation.js';
import { generateAccessToken, generateRefreshToken, hashToken } from '../utils/jwt.js';

export const registerService = async ({name, email, password}) => {
    // Check Validation
    registerValidation({ name, email, password });
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw {
            status : 409,
            massage :"Email has been registered"
        }
    };
    const hash = await bcrypt.hash(password, 9);
    // create user
    const user = await prisma.user.create({
        data:{
            name,email, password: hash, updatedAt: new Date()
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
        }
    })
    

    return user;
}

export const loginService = async ({email, password}) => {
    // Cheack Email
    const user = await prisma.user.findUnique({ where : {email} });
    if (!user) {
        throw{
            status : 401,
            massage : "Cannot find the Email"
        }
    };
    // Check Password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw {
            status : 401,
            massage : "Wrong Password"
        }
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    //Store refresh token (hashed) 
    await prisma.refreshToken.create({
        data:{
            token: hashToken(refreshToken),
            user_id: user.id,
            expiresAt: new Date(Date.now() + 7 * 86400000)
        }
    });
    return{
        accessToken,
        refreshToken
    }
}

export const refreshService = async (refreshToken) => {
    if (!refreshToken) {
        throw {
            status : 401,
            massage : "Unauthorized refresh"
        };
    }
    const tokenHash = hashToken(refreshToken);
    // Find stored refresh token
    const stored =await prisma.refreshToken.findFirst({
        where : {
            token : tokenHash,
            revoked : false
        }
    });
    //reused detection
    if (!stored) {
        await prisma.refreshToken.updateMany({
            where : {revoked: false},
            data : {revoked: true}
        });
        throw {
            status: 403,
            massage: "Forbidden reused"
        }
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
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();
    await prisma.refreshToken.create({
        data: {
            token: hashToken(newRefreshToken),
            user_id: user.id,
            expiresAt: new Date(Date.now() + 7 *  86400000)
        }
    });

    return {
        newAccess : newAccessToken,
        newRefresh : newRefreshToken
    }
}

export const logoutService = async(refreshToken) =>{
    if (!refreshToken) {
        return;
    }
    await prisma.refreshToken.updateMany({
        where : {
            token:hashToken(refreshToken),
            revoked:false
        },
        data: {
            revoked: true
        }
    })
}