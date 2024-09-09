"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Navbar() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    return (
        <nav className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl">My Blog</h1>
                <div className="flex items-center gap-4">
                    {userId && (
                        <Link href={`/blogs-by-user`}>
                            <button className="bg-blue-500 px-4 py-2 rounded text-white">
                                My Blogs
                            </button>
                        </Link>
                    )}
                    <Link href="/newPost">
                        <button className="bg-green-500 px-4 py-2 rounded text-white">
                            Create a New Post
                        </button>
                    </Link>

                    <Link href="/blogs">
                        <button className="bg-green-500 px-4 py-2 rounded text-white">
                            All Blogs
                        </button>
                    </Link>
                    <button className="bg-red-500 px-4 py-2 rounded text-white"
                        onClick={() =>
                            signOut({ callbackUrl: '/', redirect: true })}>

                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}
