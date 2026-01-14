import { RateLimiterMemory } from "rate-limiter-flexible"
import { redis } from '../config/redis.js';

export const apiRateLimiter = new RateLimiterMemory({
    storeClient: redis,
    keyPrefix:'api',
    points: 60,
    duration: 20
})

export const loginRateLimiter = new RateLimiterMemory({
    storeClient: redis,
    keyPrefix:'login',
    points: 10,
    duration: 5
})

export const registerRateLimiter = new RateLimiterMemory({
    storeClient: redis,
    keyPrefix:'login',
    points: 10,
    duration: 5
})