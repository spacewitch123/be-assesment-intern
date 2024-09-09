// app/api/blogs/route.js
import { NextResponse } from 'next/server';
import { connectMongodb } from '@/lib/mongoose'; // Adjust the import path if necessary 
import Post from '@/models/posts';

export async function GET(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    try {
        // Connect to the database
        await connectMongodb();

        // Fetch all blog posts from the database
        const blogs = await Post.find({ user: userId }) // Use .lean() for faster queries

        // Return the blog posts as JSON
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
    }
}

// app/api/blogs/route.js

