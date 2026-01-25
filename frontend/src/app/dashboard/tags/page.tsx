"use client";

import { useEffect, useState } from "react";
import { getTag, createTag } from "@/service/tag.service";
import { AxiosError } from "axios";

interface Tag {
    id: number;
    name: string;
    slug?: string;
}

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTag, setNewTag] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
        setLoading(true);
        const response = await getTag();
        // Backend returns { success, message, data: [...] }
        const tagsData = response.data?.data || response.data || [];
        setTags(Array.isArray(tagsData) ? tagsData : []);
        } catch (err) {
        console.error(err);
        setError("Failed to load tags");
        setTags([]);
        } finally {
        setLoading(false);
        }
    };

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTag.trim()) return;

        setIsSubmitting(true);
        setError("");
        try {
        await createTag({ name: newTag });
        setNewTag("");
        await fetchTags();
        } catch (err) {
        if (err instanceof AxiosError) {
            setError(err.response?.data?.message || "Failed to create tag");
        } else {
            setError("Failed to create tag");
        }
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Tags
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create and manage blog post tags
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Add New Tag
        </h2>
        <form onSubmit={handleCreateTag} className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tag name..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newTag.trim()}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Add"}
          </button>
        </form>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Tags
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading tags...</p>
        ) : tags.length === 0 ? (
          <p className="text-gray-500">No tags yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                #{tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    );
}
