import response from "../res/responses.js";
import { createCommentsService, deleteCommentsService, getCommentsService } from "../service/comments.service.js";

export const createComments = async (req, res) => {
    try {
        const postId = Number(req.params.postId);
        const { content, parentId } = req.body;
        const userId = req.user.id;
        const comment = await createCommentsService({
            postId, userId, content, parentId
        });
        return response(201,"Comment created success", comment, res)
    } catch (error) {
        console.error("Created commmet error: ", error);
        return response(error.status || 500, error.massage || "Server Comment created error ", null, res);
    }
}
export const getComments = async (req, res) => {
    try {
        const postId = Number(req.params.postId);
        const comment = await getCommentsService(postId);
        return response(200,"Get Comment by Post success", comment, res)
    } catch (error) {
        console.error("Get commmet by post error: ", error);
        return response(error.status || 500, error.massage || "Server Get commmet by post error ", null, res);
    }
}
export const deleteComments = async (req, res) => {
    try {
        const commentId = Number(req.params.id);
        const userId = req.user.id;
        const result = await deleteCommentsService(commentId,userId);
        return response(200,"Success delete comments", result, res)
    } catch (error) {
        console.error("Delete commmet error: ", error);
        return response(error.status || 500, error.massage || "Server Delete commmet error ", null, res);
    }
}