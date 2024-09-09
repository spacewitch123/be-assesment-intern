import { connectMongodb } from "@/lib/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongodb();
        const { email } = await req.json();

        const user = await User.findOne({ email });

        if (user) {
            // Email already exists
            return NextResponse.json({ message: "An email already exists" }, { status: 409 });
        } else {
            // Email does not exist
            return NextResponse.json({ message: "Email available" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error finding user:", error);
        return NextResponse.json({ message: "Error finding user" }, { status: 500 });
    }
}
