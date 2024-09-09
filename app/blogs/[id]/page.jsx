
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function UserBlogs({ params }) {
    const { id } = params; // 'id' is the user ID
    const [blogs, setBlogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchUserBlogs() {
            try {
                const response = await fetch(`/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserBlogs();
    }, [id]);


    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Blog Post</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">{blogs.title}</h2>
                    <p className="text-gray-600 mb-2 text-sm">By {blogs.fullName} on {new Date(blogs.timestamp).toLocaleDateString()}</p>

                    {blogs.image && (
                        <img
                            src={blogs.image}
                            alt={blogs.title}
                            className="w-full max-h-60 object-contain rounded mb-6"
                        />
                    )}

                    <p className="text-lg">{blogs.content}</p>
                </div>
            </div>
        </div>
    );
}

// //app/api/blogs/[id]/route.js
// "use client";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Navbar from '@/components/Navbar';

// export default function BlogPost({ params }) {
//     const { id } = params;
//     const [blogs, setBlogs] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         async function fetchBlog() {
//             try {
//                 const response = await fetch(`/api/blogs/${id}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch blog post');
//                 }
//                 const data = await response.json();
//                 console.log('Fetched Blog Data:', data); // Check if data is being fetched
//                 setBlogs(data.blogs);
//                 console.log('Updated blog state:', data.blogs);
//             } catch (error) {
//                 console.error('Error:', error); // Redirect to an error page if needed
//             }
//         }

//         fetchBlog();
//     }, []);

//     if (!id) {
//         return <p>Loading...</p>;
//     }


//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <Navbar />
//             <div className="container mx-auto p-8">
//                 <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {blogs.map(blog => (
//                         <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
//                             <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//                             <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
//                             {blog.image && (
//                                 <img
//                                     src={blog.image}
//                                     alt={blog.title}
//                                     className="w-full h-48 object-cover rounded"
//                                 />
//                             )}
//                             <div className="mt-4">
//                                 Read More
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

