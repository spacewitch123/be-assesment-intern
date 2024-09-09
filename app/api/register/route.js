import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongodb } from "@/lib/mongoose";
import User from "@/models/users";

export async function POST(req) {
    try {
        const { fullName, username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongodb();
        await User.create({ fullName, username, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Email Already Exists" }, { status: 500 });
    }
}
