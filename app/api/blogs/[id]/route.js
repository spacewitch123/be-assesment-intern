// // app/api/blogs/[id]/route.js
// import { NextResponse } from 'next/server';
// import { connectMongodb } from '@/lib/mongoose'; // Adjust the import path if necessary// Adjust the import path if necessary
// import Post from '@/models/posts';
// import { Query } from 'mongoose';

// export async function GET(request, { params }) {
//     const { id } = params;

//     try {
//         // Connect to the database
//         await connectMongodb();
//         // Fetch the blog post by ID
//         const blogs = await Post.find({ id });
//         if (!blogs) {
//             return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
//         }

//         // Return the blog post as JSON
//         return NextResponse.json({ blogs });
//     } catch (error) {
//         console.error('Error fetching blog:', error);
//         return NextResponse.json({ message: 'Error fetching blog' }, { status: 500 });
//     }
// }



// app/api/blogs/[id]/route.js
import { NextResponse } from 'next/server';
import { connectMongodb } from '@/lib/mongoose'; // Adjust the import path if necessary// Adjust the import path if necessary
import Post from '@/models/posts';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        // Connect to the database
        await connectMongodb();
        // Fetch the blog post by ID
        const blogs = await Post.findById(id);
        if (!blogs) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        // Return the blog post as JSON
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ message: 'Error fetching blog' }, { status: 500 });
    }
}



