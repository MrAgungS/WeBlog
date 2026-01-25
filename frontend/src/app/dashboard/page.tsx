"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/Blogcard";
import { getAllPosts, Post } from "@/service/post.service";

export default function DashboardWeBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAllPosts()
        .then(setPosts)
        .finally(() => setLoading(false));
    }, []);
    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Link
                        href="/dashboard/post/create"
                        className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition text-center"
                    >
                        + Create Post
                    </Link>
                    <Link
                        href="/dashboard/categories"
                        className="rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white hover:bg-purple-700 transition text-center"
                    >
                        📁 Categories
                    </Link>
                    <Link
                        href="/dashboard/tags"
                        className="rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-white hover:bg-amber-700 transition text-center"
                    >
                        🏷️ Tags
                    </Link>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">My Blog Posts</h2>
            {loading && <p>Loading...</p>}

            {!loading && posts.length === 0 && (
                <p className="text-gray-500">Belum ada post</p>
            )}

            {!loading && posts.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
