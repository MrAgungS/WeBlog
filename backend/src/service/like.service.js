import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

export const likePostService = async (postId, userId) => {
    try {
        if (!postId || !userId) {
            throw new AppError("Invalid data", 400);
        }
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });
        if (!post || post.status === "ARCHIVED") {
            throw new AppError("Post not found", 404);
        }
        const exist = await prisma.like.findUnique({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: postId,
                }
            }
        });
        if (exist) {
            throw new AppError("Post already liked", 409);
        }
        return prisma.like.create({
            data: {
                user_id: userId,
                post_id: postId,
            }
        });
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Like Post Service Error:", error);
        throw new AppError(error.message || "Failed to like post", 500);
    }
};
export const unlikePostService = async (postId, userId) => {
    try {
        const like = await prisma.like.findUnique({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: postId,
                }
            }
        });
        if (!like) {
            throw new AppError("Like not found", 404);
        }
        return prisma.like.delete({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: postId,
                }
            }
        });
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Unlike Post Service Error:", error);
        throw new AppError(error.message || "Failed to unlike post", 500);
    }
}
