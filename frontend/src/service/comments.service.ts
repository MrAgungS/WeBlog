import api from "@/lib/axiosInstance"

interface CreateCommentsDTO {
    content: string;
    parentId?: number;
}
export const createComments = async (payload: CreateCommentsDTO) => {
    return api.post("/api/posts/:postId/createcomments", payload)
}
export const getComments = async (postId:number) => {
    return api.post(`/api/posts/postid/${postId}`)
}
export const deleteComments = async (id:number) => {
    return api.delete(`/api/posts/${id}/deletecomments`)
}