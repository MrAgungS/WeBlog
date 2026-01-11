import express from "express";
import cookieParser from "cookie-parser"

import { loadEnv } from "./config/env.js";
import authRoutes from './routes/authRoutes.js';
// import categoriesRoutes from './routes/categoriesRoutes.js';
// import commentsRoutes from './routes/commentsRoutes.js';
// import postRoutes from './routes/postRoutes.js';
// import tagRoutes from './routes/tagRoutes.js';

loadEnv();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentsRoutes);
// app.use("/api/tag", tagRoutes);
// app.use("/api/categories", categoriesRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Started at http://localhost:${PORT}`);
  });
}

export default app;