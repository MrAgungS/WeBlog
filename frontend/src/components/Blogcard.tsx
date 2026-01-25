"use client";

import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Post, likePost, unlikePost, getPost } from "@/service/post.service";
import { useState, useEffect } from "react";
import { getComments } from "@/service/comments.service";

interface BlogCardProps {
  post: Post;
}
interface PostDetail {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    status: string;
    createdAt: string;
    likes?: number;
    isLiked?: boolean;
}
interface Comment {
    id: number;
    content: string;
    author: {
        name: string;
    };
    createdAt: string;
}
export default function BlogCard({ post }: BlogCardProps) {
    const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [isLiking, setIsLiking] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const data = await getPost(post.id);
                const postData = data.data || data;
                setPostDetail(postData);
                setLikes(postData.likes || 0);
                setIsLiked(postData.isLiked || false);
                setCommentsCount(postData.commentsCount || 0);
            } catch (err) {
                console.error("Failed to fetch post data:", err);
            }
        };
        fetchPostData();
    }, [post.id]);
    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiking(true);
        try {
            if (isLiked) {
                await unlikePost(post.id);
                setIsLiked(false);
                setLikes(prev => prev - 1);
            } else {
                await likePost(post.id);
                setIsLiked(true);
                setLikes(prev => prev + 1);
            }
        } catch (err) {
            console.error("Error toggling like:", err);
        } finally {
            setIsLiking(false);
        }
    };
    const handleToggleComments = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!showComments) {
            setLoadingComments(true);
            try {
                const data = await getComments(post.id);
                const commentsData = data.data || data || [];
                setComments(Array.isArray(commentsData) ? commentsData : []);
                setCommentsCount(Array.isArray(commentsData) ? commentsData.length : 0);
            } catch (err) {
                console.error("Error fetching comments:", err);
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        }
        setShowComments(!showComments);
    };
    return (
        <article className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(post.createdAt)}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {post.status}
                    </span>
                </div>
                
                <Link href={`/posts/${post.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition">
                        {post.title}
                    </h3>
                </Link>

                {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {post.excerpt}
                    </p>
                )}
            </div>
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        isLiked
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    } disabled:opacity-50`}
                >
                    <span className="text-lg">❤️</span>
                    <span>{likes}</span>
                </button>
                <button
                    onClick={handleToggleComments}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition"
                >
                    <span className="text-lg">💬</span>
                    <span>{commentsCount}</span>
                </button>
                <Link
                    href={`/dashboard/post/${post.id}/edit`}
                    className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition"
                >
                    ✏️ Edit
                </Link>
            </div>
            {showComments && (
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 bg-gray-50 dark:bg-gray-800/50">
                    {loadingComments ? (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                        </div>
                    ) : comments.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            No comments yet
                        </p>
                    ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {comments.map((comment) => (
                                <div key={comment.id} className="rounded bg-white dark:bg-gray-900 p-2.5 text-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {comment.author?.name}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(comment.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 wrap-break-word">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link
                        href={`/posts/${post.slug}`}
                        className="block mt-3 text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                        View all & comment →
                    </Link>
                </div>
            )}
        </article>
    );
}
