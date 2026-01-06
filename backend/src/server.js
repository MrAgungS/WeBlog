import express from "express";
import dotenv from "dotenv";

// import { loadEnv } from "./config/env.js";
import authRoutes from './routes/authRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
// loadEnv();
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(PORT, () =>{
    console.log(`Started to localhost:${PORT}`);
});