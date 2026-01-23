import response from '../res/responses.js';
import { createPostService, deletePostService, FindAllPosts, getPostByIdService, getPostService, updatePostService } from '../service/post.service.js';

export const getPost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await getPostByIdService(id);
        return response(200,"Success get post", post, res)
    } catch (error) {
        console.error("Get post Error: " , error);
        return response(error.status || 500, error.massage || "Server Get Post Error", error, res)
    };
};
export const getAllPosts = async (req,res) => {
    try {
        const post = await FindAllPosts();
        return response(200,"Success get all posts", post, res)
    } catch (error) {
        console.error("Get all post error: ", error);
        return response(error.status || 500, error.massage || "Server Get All Post Error", error, res)
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
        return response(error.status || 500, error.massage || "Server Create Error", error, res);
    }
}
export const getPostBySLug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await getPostService(slug);
        return response(200,"Success get post by id", post, res);
    } catch (error) {
        console.error("Get post by id Error: " , error);
        return response(error.status || 500, error.massage || "Server get post by id error ", error, res);
    }
}
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await updatePostService(Number(id), title, content);
        return response(200, "Success update Post", post, res)
    } catch (error) {
        console.error("Update Post Error: " , error);
        return response(error.status || 500, error.massage ||"Server Update post error", error, res)
    }
}
export const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const postDelete = await deletePostService(id);
        return response(200, "Success delete post", postDelete, res);
    } catch (error) {
        console.error("Delete Post Error: ", error);
        return response(error.status || 500, error.massage ||"Server delete post error", error, res)
    }
}
