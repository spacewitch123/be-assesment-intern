"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession

export default function CreatePost() {
    const { data: session } = useSession(); // Use useSession to get session data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [base64Image, setBase64Image] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [fullName, setFullName] = useState(''); // State to store the full name
    const router = useRouter();

    // useEffect to update fullName when session data is available
    useEffect(() => {
        if (session?.user?.fullName) {
            setFullName(session.user.fullName);
        } else {
            setFullName("Anonymous");  // Set a fallback value or handle the absence of a name
        }
    }, [session]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setBase64Image(null);
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const normalizedContent = content.trim().replace(/\s+/g, ' ');

        const formData = new FormData();
        formData.append('title', trimmedTitle);
        formData.append('content', normalizedContent);
        formData.append('fullName', fullName); // Append full name from session
        formData.append('timestamp', new Date().toISOString()); // Append current timestamp
        if (base64Image) {
            formData.append('image', base64Image);
        }

        console.log('Session:', session);

        try {
            const response = await fetch('/api/newposts', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                },
                credentials: 'include', // Include the access token in the Authorization header
            });

            const contentType = response.headers.get('content-type');
            let result;
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                result = await response.text(); // Handle non-JSON response
                console.error('Non-JSON response:', result);
            }

            if (response.ok) {
                alert('Blog post created successfully');
                router.redirect('/dashboard'); // Refresh page on success
            } else {
                alert(`Error: ${result.message || 'Failed to create blog post'}`);
                console.error('Error:', result.message || result);
            }
        } catch (error) {
            alert('An error occurred while creating the blog post.');
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='max-w'>
            <Navbar />
            <div className="max-w-3xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown Supported)</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="6"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">* You can format text with Markdown syntax (e.g., **bold**, *italic*, and bullet points)</p>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {previewImage && (
                            <Image
                                src={previewImage}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="mt-2 w-full h-32 object-cover"
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
}
