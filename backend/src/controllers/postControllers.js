import response from '../res/responses.js';
import { createPostService, deletePostService, FindAllPosts, getPostByIdService, getPostService, updatePostService } from '../service/post.service.js';

export const getPost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return response(400, "Invalid post ID", null, res);
        }
        const post = await getPostByIdService(id);
        return response(200,"Success get post", post, res)
    } catch (error) {
        console.error("Get post Error: " , error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Get Post Error";
        return response(statusCode, message, null, res)
    };
};
export const getAllPosts = async (req,res) => {
    try {
        const post = await FindAllPosts();
        return response(200,"Success get all posts", post, res)
    } catch (error) {
        console.error("Get all post error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Get All Post Error";
        return response(statusCode, message, null, res)
    }
}
export const createPost = async (req, res) => {
    try {
        // console.log("REQ.USER:", req.user);
        const { title, content } = req.body
        const userId = req.user?.id;
        if (!title || !content) {
            return response(400,"Title and content are required", null, res);
        }
        const post = await createPostService(title, content, userId);
        return response(201,"Success Create Post", post, res);
    } catch (error) {
        console.error("Create Error :" , error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Create Error";
        return response(statusCode, message, null, res);
    }
}
export const getPostBySLug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await getPostService(slug);
        return response(200,"Success get post by id", post, res);
    } catch (error) {
        console.error("Get post by id Error: " , error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server get post by id error";
        return response(statusCode, message, null, res);
    }
}
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const idNum = Number(id);
        if (isNaN(idNum)) {
            return response(400, "Invalid post ID", null, res);
        }
        const { title, content, status } = req.body;
        const post = await updatePostService(idNum, title, content, status);
        return response(200, "Success update Post", post, res)
    } catch (error) {
        console.error("Update Post Error: " , error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Update post error";
        return response(statusCode, message, null, res)
    }
}
export const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return response(400, "Invalid post ID", null, res);
        }
        const postDelete = await deletePostService(id);
        return response(200, "Success delete post", postDelete, res);
    } catch (error) {
        console.error("Delete Post Error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server delete post error";
        return response(statusCode, message, null, res)
    }
}
