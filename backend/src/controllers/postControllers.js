import response from '../res/responses.js';
import { createPostService, getPostService} from '../service/post.service.js';

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
        return response(201,"Success Create Post", post, null)
    } catch (error) {
        console.error("Create Error :");
        return response(error.status || 500, error.massage || "Server Create Error", null, res);
    }
}
export const getPostById = async (res, req) => {
    
}
export const updatePost = async (res, req) => {
    
}
export const deletePost = async (res, req) => {
    
}
