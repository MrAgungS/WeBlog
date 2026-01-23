"use client";

import { useEffect, useState } from "react";
import { getPost, updatePost } from "@/service/post.service";
import { ButtonUi } from "@/components/ui/ButtonUi";

type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
interface EditWePostProps {
    id: number;
}

export default function EditWePost({ id }: EditWePostProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">("DRAFT");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
        const { data } = await getPost(id);
        setTitle(data.title);
        setContent(data.content);
        setStatus(data.status);
        };

        fetchPost();
    }, [id]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updatePost(id, {
                title,
                content,
                status,
            });
            alert("Post updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update post");
        } finally {
            setIsLoading(false);
        }
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as PostStatus);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border px-4 py-2"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full rounded border px-4 py-2"
            />
            <select
                value={status}
                onChange={handleStatusChange}
                className="w-full rounded border px-4 py-2"
            >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
            </select>
            <ButtonUi type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
            </ButtonUi>
        </form>
    );
}
