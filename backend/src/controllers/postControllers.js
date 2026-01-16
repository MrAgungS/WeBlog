import response from '../res/responses.js';
import { createPostService, deletePostService, getPostByIdService, getPostService, updatePostService} from '../service/post.service.js';

export const getPost = async (req, res) => {
    try {
        const slug = await getPostService(req.params)
        return response(200,"Success get post", slug, res)
    } catch (error) {
        console.error("Get post Error: ");
        return response(error.status || 500, error.massage || "Server Get Post Error", null, res)
    };
};
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title || content) {
            return response(400,"Title and content are required", null, res);
        }
        const post = await createPostService({title, content});
        return response(201,"Success Create Post", post, null);
    } catch (error) {
        console.error("Create Error :");
        return response(error.status || 500, error.massage || "Server Create Error", null, res);
    }
}
export const getPostById = async (req, res) => {
    try {
        const getById = await getPostByIdService(req.params.id);
        return response(200,"Success get post by id", getById, res);
    } catch (error) {
        console.error("Get post by id Error: ");
        return response(500, "Server get post by id error ", null, res);
    }
}
export const updatePost = async (req, res) => {
    try {
        const PostUpdate = await updatePostService(req.params.id)
        return response(200, "Success update Post", PostUpdate, res)
    } catch (error) {
        console.error("Update Post Error: ");
        return response(500, "Server Update post error", null, res)
    }
}
export const deletePost = async (req, res) => {
    try {
        const postDelete = await deletePostService(req.params);
        return response(200, "Success delete post", postDelete, res);
    } catch (error) {
        console.error("Delete Post Error");
        return response(500, "Server delete post error", null, res)
    }
}
