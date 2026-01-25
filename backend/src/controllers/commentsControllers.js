import response from "../res/responses.js";
import { createCommentsService, deleteCommentsService, getCommentsService } from "../service/comments.service.js";

export const createComments = async (req, res) => {
    try {
        const postIdParam = req.params.postId;
        const postId = Number(postIdParam);
        if (!postIdParam || isNaN(postId) || postId <= 0) {
            console.error("Invalid postId - params:", req.params);
            return response(400, `Invalid post ID: received '${postIdParam}'`, null, res);
        }
        const { content, parentId } = req.body;
        if (!content || !content.trim()) {
            return response(400, "Comment content is required", null, res);
        }
        const userId = req.user?.id;
        if (!userId) {
            return response(401, "Unauthorized - user not found", null, res);
        }
        const comment = await createCommentsService({
            postId, userId, content, parentId
        });
        return response(201,"Comment created success", comment, res)
    } catch (error) {
        console.error("Created comment error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Comment created error";
        return response(statusCode, message, null, res);
    }
}
export const getComments = async (req, res) => {
    try {
        const postId = Number(req.params.postId);
        
        if (isNaN(postId)) {
            return response(400, "Invalid post ID", null, res);
        }
        const comment = await getCommentsService(postId);
        return response(200,"Get Comment by Post success", comment, res)
    } catch (error) {
        console.error("Get commmet by post error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Get commmet by post error";
        return response(statusCode, message, null, res);
    }
}
export const deleteComments = async (req, res) => {
    try {
        const commentId = Number(req.params.id);
        
        if (isNaN(commentId)) {
            return response(400, "Invalid comment ID", null, res);
        }
        const userId = req.user.id;
        const result = await deleteCommentsService(commentId,userId);
        return response(200,"Success delete comments", result, res)
    } catch (error) {
        console.error("Delete commmet error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Delete commmet error";
        return response(statusCode, message, null, res);
    }
}