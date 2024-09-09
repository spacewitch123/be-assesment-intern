"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UserBlogs() {
    const { data: session } = useSession();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const userId = session?.user?.id;

                const response = await fetch(`/api/blogs-by-user?userId=${userId}`); // Adjust the API endpoint if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, [session]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
                {blogs.length === 0 ? (
                    <p className="text-lg text-gray-700">You currently have no blogs.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map(blog => (
                            <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                )}
                                <div className="mt-4">
                                    <Link href={`/blogs/${blog._id}`}>
                                        <div className="text-indigo-600 hover:underline">Read More</div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
