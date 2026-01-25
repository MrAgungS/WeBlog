import api from "@/lib/axiosInstance"

interface CreateCommentsDTO {
    content: string;
    parentId?: number;
}
export const createComments = async (postId: number, payload: CreateCommentsDTO) => {
    const res = await api.post(`/comments/${postId}/createcomments`, payload);
    return res.data;
}
export const getComments = async (postId: number) => {
    const res = await api.get(`/comments/postid/${postId}`);
    return res.data;
}
export const deleteComments = async (commentId: number) => {
    const res = await api.delete(`/comments/${commentId}/deletecomments`);
    return res.data;
}