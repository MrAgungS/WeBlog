import Redis from 'ioredis';
import { loadEnv } from './env.js';

loadEnv()
export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null,
});

redis.on("connect", () =>{
    console.log("Redis Connect");
});

redis.on("error", (err) =>{
    console.log(err,"Redis Error");
})