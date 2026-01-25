"use client";

import { useState } from "react";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { createPost } from "@/service/post.service";

export default function CreateWePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createPost({
                title,
                content,
                category,
                tag: tags.split(",").map((t) => t.trim()),
            });
            alert("Post created successfully 🚀");
            setTitle("");
            setContent("");
            setCategory("");
            setTags("");
        } catch (error) {
            console.error(error);
            alert("Failed to create post ❌");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Post
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Write something meaningful. Don’t overthink the frontend 😉
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
                <div className="mb-5">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My awesome backend journey"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell your story here..."
                        rows={8}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Backend, DevOps, Life..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                </div>
                <div className="mb-8">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tags
                    </label>
                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="nodejs, prisma, express"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-gray-500"></p>
                </div>
                <div className="flex justify-end">
                    <ButtonUi type="submit" disabled={isLoading}>
                        {isLoading ? "Publishing..." : "Publish Post"}
                    </ButtonUi>
                </div>
            </form>
        </div>
    );
}
