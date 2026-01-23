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
export const getAllPosts = async (): Promise<Post[]> => {
    const res = await api.get<Post[]>("/api/posts");
    return res.data;
};
export const getPost = async (id: number): Promise<Post> => {
    const res = await api.get<Post>(`/api/posts/id/${id}`);
    return res.data;
};

export const createPost = async (payload: CreatePostDTO): Promise<Post> => {
    const res = await api.post<Post>("/api/posts/create", payload);
    return res.data;
};
export const getPostBySlug = async (slug: string): Promise<Post> => {
    const res = await api.get<Post>(`/api/posts/slug/${slug}`);
    return res.data;
};
export const updatePost = async (id: number, payload: UpdatePostDTO): Promise<Post> => {
    const res = await api.put<Post>(`/api/posts/update/${id}`, payload);
    return res.data;
};
export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`/api/posts/delete/id/${id}`);
};
export const likePost = async (postId: number): Promise<void> => {
    await api.post(`/api/posts/${postId}/like`);
};
export const unlikePost = async (postId: number): Promise<void> => {
    await api.delete(`/api/posts/${postId}/like`);
};

