import response from "../res/responses.js";
import { apiRateLimiter, loginRateLimiter, registerRateLimiter} from "./rateLimiter.js"

export const apiRateLimitMiddleware = async (req, res, next) =>{
    try {
        await apiRateLimiter.consume(req.user?.id || req.ip);
        next();
    } catch (error) {
        return response(429,"To many request, try again later")
    }
};

export const loginRateLimitMiddleware =  async() =>{
    try {
        await loginRateLimiter.consume(req.user?.id || req.ip);
        next();
    } catch (error) {
        return response(429,"To many login attempts, try again later")
    }   
}
export const registerRateLimitMiddleware =  async() =>{
    try {
        await registerRateLimiter.consume(req.user?.id || req.ip);
        next();
    } catch (error) {
        return response(429,"To many register attempts, try again later")
    }   
}