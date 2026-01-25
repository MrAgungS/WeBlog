import response from '../res/responses.js';
import { loginService, refreshService, registerService } from '../service/auth.service.js';

export const register = async (req, res) => {
    try {
        const user = await registerService(req.body);
        return response(201,"Registration successful",user,res);
    } catch (error) {
        console.error("Register Error : ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Register Error";
        return response(statusCode, message, null, res)
    };
};
export const login = async (req, res) => {
    try {
        const {accessToken, refreshToken } = await loginService(req.body)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 86400000
        })
        return res.json({ accessToken })
    } catch (error) {
        console.error("Login Error : ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Login Error";
        return response(statusCode, message, null, res)
    };
};
export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const { newAccess, newRefresh } =await refreshService(refreshToken);
        res.cookie("refreshToken", newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 86400000,
        });

        return res.status(200).json({
        success: true,
        accessToken: newAccess,
        });
    } catch (error) {
        console.error("Refresh Error:", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Refresh Error";
        return response(statusCode, message, null, res);
    }
};
export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        await refreshService(refreshToken)
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure : true,
            sameSite : "strict",            
        });
        return response(200, "Logout Success", null, res)
    } catch (error) {
        console.error("Logout Error : " , error);
        return response(500,"Server Logout Error", null, res)        
    };
};