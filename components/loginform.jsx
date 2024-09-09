"use client";
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res.error) {
                setError("Invalid email or password");
                return;
            }
            router.push("/dashboard");

        } catch (error) {
            console.error("Error logging in", error);
            setError("Error logging in");
        }
    }
    return (
        <div className="grid place-items-center h-screen">
            <div className="bg-white p-8 rounded-lg border-t-4 border-green-400 shadow-lg">
                <h2 className="text-xl font-bold my-4">Enter your details</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className="bg-green-600 text-white font-bold py-2 px-6 cursor-pointer">
                        Login
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white font-bold w-fit text-sm p-2 rounded">
                            {error}
                        </div>
                    )}
                </form>
                <Link className="text-sm mt-3 text-right block" href="/register">
                    Don't have an account? <span className="underline">Register</span>
                </Link>
            </div>
        </div>
    );
}
