import api from "@/lib/axiosInstance"

type PostStatus = "DRAFT" | "PUBLISHED"  | "ARCHIVED" ;
interface CreatePostDTO{
    title: string,
    content: string,
    category: string,
    tag: string[]
};
interface UpdatePostDTO{
    title?: string,
    content?: string,
    status?: PostStatus
}
export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    status: PostStatus;
    createdAt: string;
}
export const getAllPosts = async ()=> {
    const res = await api.get("/posts/");
    return res.data
};
export const getPost = async (id: number)=> {
    const res = await api.get(`/posts/id/${id}`);
    return res.data
};
export const createPost = async (payload: CreatePostDTO)=> {
    const res = await api.post("/posts/create", payload);
    return res.data
};
export const getPostBySlug = async (slug: string) => {
    const res = await api.get(`/posts/slug/${slug}`);
    return res.data
};
export const updatePost = async (id: number, payload: UpdatePostDTO) => {
    const res = await api.put(`/posts/update/${id}`, payload);
    return res.data
};
export const deletePost = async (id: number)=> {
    const res = await api.delete(`/posts/delete/${id}`);
    return res.data
};
export const likePost = async (postId: number)=> {
    const res = await api.post(`/posts/${postId}/like`);
    return res.data
};
export const unlikePost = async (postId: number) => {
    const res = await api.delete(`/posts/${postId}/like`);
    return res.data
};

