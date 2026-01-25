import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { loadEnv } from "./config/env.js";
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import likeRoutes from './routes/likeRoutes.js'

loadEnv();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", likeRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tag", tagRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Started at http://localhost:${PORT}`);
  });
}

export default app;