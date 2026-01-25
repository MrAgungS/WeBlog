"use client";

import { useEffect, useState } from "react";
import { getAllPosts, Post } from "@/service/post.service";
import BlogCard from "@/components/Blogcard";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllPosts()
      .then((response) => {
        const postsData = response.data?.data || response.data || [];
        setPosts(Array.isArray(postsData) ? postsData : []);
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Write. Publish. Share.
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          A simple personal blog platform
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a href="/dashboard" className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition">
            Dashboard
          </a>
          <a href="/about" className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition">
            About
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Write Posts" desc="Create and edit blog posts with a clean dashboard experience."/>
            <FeatureCard title="Manage Content" desc="Draft, publish, archive, and organize your content easily."/>
            <FeatureCard title="Modern Stack" desc="Built using Next.js (Frontend), Express (Backend)."/>
            <FeatureCard title="Organize Content" desc="Create categories and tags to organize your posts efficiently."/>
            <FeatureCard title="Community" desc="Share posts with the world and engage through comments."/>
            <FeatureCard title="Like System" desc="Readers can like your posts to show their appreciation."/>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts yet</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {desc}
      </p>
    </div>
  );
}
