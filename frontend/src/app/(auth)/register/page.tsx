"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/service/auth.service";
import { AxiosError } from "axios";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await register({ name, email, password });
            router.push("/login");
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || err.message || "Register failed";
                console.error("Register Error:", {
                    status: err.response?.status,
                    data: err.response?.data,
                    message: errorMessage
                });
                setError(errorMessage);
            } else {
                console.error("Unexpected error:", err);
                setError("Unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
                <h1 className="mb-6 text-2xl font-bold text-center">Create Account</h1>
                {error && (
                    <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </p>
                )}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                </div>
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
