import api from "@/lib/axiosInstance"

interface CreatePostDTO{
    title: string,
    content: string,
};
type PostStatus = "DRAFT" | "PUBLISHED"  | "ARCHIVED" ;
interface UpdatePostDTO{
    title?: string,
    content?: string,
    status?: PostStatus
}
export const getPost = async (id:number) => {
    return api.get(`/api/posts/id/${id}`)
};
export const createPost = async (payload: CreatePostDTO) => {
    return api.post(`/api/posts/create/`, payload)
};
export const getPostBySLug = async (slug:string) => {
    return api.get(`/api/posts/slug/${slug}`,)
};
export const updatePost = async (id:number, payload:UpdatePostDTO) => {
    return api.put(`/api/posts/update/${id}`,payload)
};
export const deletePost = async (id:number) => {
    return api.delete(`/api/delete/id/${id}`,)
};
export const likePost = async (postId:number) => {
    return api.post(`/api/delete/id/${postId}`,)
};
export const unlikePost = async (postId:number) => {
    return api.delete(`/api/delete/id/${postId}`,)
};

