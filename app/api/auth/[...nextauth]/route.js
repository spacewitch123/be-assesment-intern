import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongodb } from "@/lib/mongoose";
import User from "@/models/users";

async function getUserByEmail(email) {
    try {
        await connectMongodb();
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

async function findUserByCredentials(email, password) {
    const user = await getUserByEmail(email);
    console.log('User from DB:', user);

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (isPasswordValid) {
            return {
                id: user._id.toString(),
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                // If you have accessToken logic, handle it here
                // accessToken: user.accessToken
            };
        } else {
            console.log('Invalid password');
        }
    } else {
        console.log('User not found');
    }
    return null;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('Credentials:', credentials);
                const user = await findUserByCredentials(credentials.email, credentials.password);

                if (user) {
                    console.log('User authenticated:', user);
                    return user;
                }

                console.log('Authentication failed');
                return null;
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.username = user.username;
                token.email = user.email;
                // If you have accessToken logic, handle it here
                // token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    fullName: token.fullName,
                    username: token.username,
                    email: token.email
                };
                session.accessToken = token.accessToken; // Ensure this is defined if needed
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
