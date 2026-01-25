"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost, updatePost } from "@/service/post.service";
import { ButtonUi } from "@/components/ui/ButtonUi";

type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export default function EditWePost() {
    const params = useParams();
    const id = params?.id ? Number(params.id) : null;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">("DRAFT");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setError("");
                setIsFetching(true);
                console.log("Fetching post with ID:", id, "Type:", typeof id);
                if (!id) {
                    setError("Invalid post ID");
                    return;
                }
                const response = await getPost(id);
                console.log("Fetch response:", response);
                const postData = response.data?.data || response.data;
                console.log("Post data:", postData);
                if (postData) {
                    setTitle(postData.title || "");
                    setContent(postData.content || "");
                    setStatus(postData.status || "DRAFT");
                } else {
                    setError("Failed to load post data");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                if (err instanceof Error) {
                    setError(`Failed to load post: ${err.message}`);
                } else {
                    setError("Failed to load post");
                }
            } finally {
                setIsFetching(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            // Validate ID
            if (!id) {
                setError("Invalid post ID");
                setIsLoading(false);
                return;
            }
            // Validate required fields
            if (!title.trim()) {
                setError("Title is required");
                setIsLoading(false);
                return;
            }
            if (!content.trim()) {
                setError("Content is required");
                setIsLoading(false);
                return;
            }
            console.log("Updating post with:", { id, title, content, status });
            await updatePost(id, {
                title,
                content,
                status,
            });
            alert("Post updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            if (error instanceof Error) {
                setError(`Failed to update post: ${error.message}`);
            } else {
                setError("Failed to update post");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as PostStatus);
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Edit Post</h1>
                
                {isFetching && (
                    <div className="mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 px-4 py-3 text-sm text-blue-800 dark:text-blue-300 flex items-center">
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Loading post...
                    </div>
                )}
                
                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-4 py-3 text-sm text-red-800 dark:text-red-300">
                        <span className="font-semibold">Error:</span> {error}
                    </div>
                )}
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title..."
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Post Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter post content..."
                            rows={8}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Post Status
                        </label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="DRAFT">📝 Draft</option>
                            <option value="PUBLISHED">✨ Published</option>
                            <option value="ARCHIVED">📦 Archived</option>
                        </select>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Current status: <span className="font-semibold">{status}</span>
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex gap-3">
                    <ButtonUi 
                        type="submit" 
                        disabled={isLoading || isFetching}
                        className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Updating..." : "Update Post"}
                    </ButtonUi>
                </div>
            </form>
        </div>
    );
}
