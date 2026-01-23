"use client";

import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Post } from "@/service/post.service";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
        <article className="rounded-[10px] border border-gray-200 bg-white px-4 pt-12 pb-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="block text-xs text-gray-500 dark:text-gray-400">
                {formatDate(post.createdAt)}
            </div>

            <Link href={`/blog/${post.slug}`}>
                <h3 className="mt-0.5 text-lg font-medium text-gray-900 hover:underline dark:text-white">
                    {post.title}
                </h3>
            </Link>

            {post.excerpt && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {post.excerpt}
                </p>
            )}

            <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {post.status}
                </span>

                <Link
                href={`/dashboard/posts/edit/${post.id}`}
                className="text-sm text-green-600 hover:underline"
                >
                    Edit
                </Link>
            </div>
        </article>
    );
}
