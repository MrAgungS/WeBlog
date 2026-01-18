import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';

export const createCommentsService = async ({ postId, userId, content, parentId }) => {
    // check
    if (!postId || !userId || !content) {
        throw new AppError("Invalid Data", 400);
    };
    return prisma.comment.create({
        data:{
            content,
            post_id:postId,
            user_id:userId,
            parent_id:parentId || null
        }
    })
}
export const getCommentsService = async (postId) => {
    return prisma.comment.findMany({
        where:{
            post_id: postId,
            parent_id: null,
        },
        include:{
            user:{
                select:{ id:true, name:true}
            },
            replies:{
                include:{
                    user:{
                        select:{ id:true, name:true}
                    }
                }
            }
        },
        orderBy:{
            createdAt:'asc'
        },
    });
}
export const deleteCommentsService = async (id, userId) => {
    const comment = await prisma.comment.findUnique({
        where:{ id },
    });
    if (!comment) {
        throw new AppError("Comment not found", 404);
    };
    if (comment.user_id !== userId) {
        throw new AppError("Forbidden", 403);
    };
    return await prisma.comment.delete({
        where:{ id }
    });
}