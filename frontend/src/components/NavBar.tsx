"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/service/auth.service";
import { AuthLink, AuthPrimaryLink, NavItem } from "./ui/NavItem";

export default function NavBar() {
    const router = useRouter();
    const isAuthenticated = false;
    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };
    return (
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="flex h-16 items-center justify-between lg:h-20">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center text-xl">
                            <span className="font-bold dark:text-white">We</span>
                            <span className="font-bold text-lime-600 dark:text-lime-500">
                                Blog
                            </span>
                        </Link>
                        <div className="hidden lg:flex items-center space-x-10">
                            <NavItem href="/" label="Home" />
                            <NavItem href="/posts" label="Posts" />
                            <NavItem href="/about" label="About" />
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        {!isAuthenticated ? (
                        <>
                            <AuthLink href="/login" label="Login" />
                            <AuthPrimaryLink href="/register" label="Sign Up" />
                        </>
                        ) : (
                        <>
                            <NavItem href="/dashboard" label="Dashboard" />
                            <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                            >
                            Logout
                            </button>
                        </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
