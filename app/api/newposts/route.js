import { NextResponse } from 'next/server';
import { connectMongodb } from '@/lib/mongoose';
import Post from '@/models/posts';
import path from 'path';
import fs from 'fs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions); // Ensure authOptions is correctly imported
        console.log('Session Server Side:', session);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: 'Unauthorized To Move Forward' }, { status: 401 });
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const fullName = formData.get('fullName');
        const timestamp = formData.get('timestamp');

        if (!title || !content || !fullName || !timestamp) {
            return NextResponse.json({ message: 'Title, content, fullName, and timestamp are required' }, { status: 400 });
        }

        let imagePath = null;
        const base64Image = formData.get('image');

        if (base64Image) {
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const uploadDir = path.join(process.cwd(), '/public/uploads');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const fileName = `${Date.now()}.png`;
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);

            imagePath = `/uploads/${fileName}`;
        }

        await connectMongodb();
        const newPost = new Post({
            title,
            content,
            image: imagePath,
            user: session.user.id,  // Ensure you use session.user.id
            fullName,
            timestamp: new Date(timestamp),
        });

        await newPost.save();

        return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error handling post request:', error);
        return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
    }
}
