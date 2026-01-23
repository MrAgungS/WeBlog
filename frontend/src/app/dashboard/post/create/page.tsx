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

            alert("Post created successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to create post");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded border px-4 py-2"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className="w-full rounded border px-4 py-2"
                rows={6}
                required
            />
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full rounded border px-4 py-2"
            />
            <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma separated)"
                className="w-full rounded border px-4 py-2"
            />  
            <ButtonUi type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Publish"}
            </ButtonUi>
        </form>
    );
}
