"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug, likePost, unlikePost } from "@/service/post.service";
import { getComments, createComments, deleteComments } from "@/service/comments.service";
import { formatDate } from "@/lib/formatDate";
import { AxiosError } from "axios";

interface PostDetail {
    id: number;
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    author?: {
        name: string;
    };
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
    parentId?: number;
}
export default function PostDetail() {
    const params = useParams();
    const slug = params?.slug as string;   
    const [post, setPost] = useState<PostDetail | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!slug) {
                    setError("Invalid post slug");
                    setLoading(false);
                    return;
                }
                const response = await getPostBySlug(slug);
                const postData = response.data || response;
                setPost(postData);
                if (postData?.id) {
                    const commentsResponse = await getComments(postData.id);
                    setComments(commentsResponse.data || commentsResponse || []);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);
    const handleLike = async () => {
        if (!post) return;
        setIsLiking(true);
        try {
            if (post.isLiked) {
                await unlikePost(post.id);
                setPost({ ...post, isLiked: false, likes: (post.likes || 0) - 1 });
            } else {
                await likePost(post.id);
                setPost({ ...post, isLiked: true, likes: (post.likes || 0) + 1 });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLiking(false);
        }
    };
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post || !post.id || !commentText.trim()) {
            setError("Unable to post comment - post data missing");
            return;
        }
        setIsSubmittingComment(true);
        try {
            console.log("Creating comment for post ID:", post.id, "Content:", commentText);
            await createComments(post.id, {
                content: commentText,
                parentId: undefined,
            });
            setCommentText("");
            const updatedCommentsResponse = await getComments(post.id);
            setComments(updatedCommentsResponse.data || updatedCommentsResponse || []);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || "Failed to post comment");
            } else {
                setError("Failed to post comment");
            }
        } finally {
            setIsSubmittingComment(false);
        }
    };
    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComments(commentId);
            setComments(comments.filter((c) => c.id !== commentId));
        } catch (err) {
            console.error(err);
        }
    };
    if (loading) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }
    if (!post) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10">
                <p className="text-red-500">Post not found</p>
            </div>
        );
    }
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      <article className="mb-12">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{post.author?.name}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <span className="capitalize text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {post.status}
            </span>
          </div>
        </header>
        <div className="prose prose-invert mb-8 max-w-none">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {post.content}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              post.isLiked
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            } disabled:opacity-50`}
          >
            ❤️ {post.likes || 0}
          </button>
        </div>
      </article>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            rows={4}
          />
          <button
            type="submit"
            disabled={isSubmittingComment || !commentText.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmittingComment ? "Posting..." : "Post Comment"}
          </button>
        </form>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {comment.author?.name}
                  </p>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </p>
                <p className="mt-2 text-gray-900 dark:text-gray-100">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
