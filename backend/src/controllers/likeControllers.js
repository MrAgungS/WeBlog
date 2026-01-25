import response from "../res/responses.js";
import { likePostService, unlikePostService } from "../service/like.service.js";

export const likePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        if (isNaN(postId)) {
            return response(400, "Invalid post ID", null, res);
        }  
        const userId = req.user.id;
        const result = await likePostService(postId, userId);
        return response(201, "Post liked", result, res);
    } catch (error) {
        return response(
            error.status || 500,
            error.message || "Server like error",
            null,
            res
        );
    }
};
export const unlikePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        
        if (isNaN(postId)) {
            return response(400, "Invalid post ID", null, res);
        }
        const userId = req.user.id;
        const result = await unlikePostService(postId, userId);
        return response(200, "Post unliked", result, res);
    } catch (error) {
        return response(
            error.status || 500,
            error.message || "Server unlike error",
            null,
            res
        );
    }
};
