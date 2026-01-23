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
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Blog Posts</h1>

                <Link
                href="/dashboard/posts/create"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                + Create Post
                </Link>
            </div>
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
    );
}
