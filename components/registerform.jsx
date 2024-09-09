"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        } else if (!email.includes("@")) {
            setError("Invalid email");
            return;
        } else if (username.length < 4) {
            setError("Username is too short");
            return;
        } else if (username.length > 15) {
            setError("Username is too long");
            return;
        }
        else if (fullName.length < 4) {
            setError("Full Name is too short");
            return;
        }

        try {
            const userExists = await fetch("/api/userExists", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { user } = await userExists.json();
            if (user) {
                setError("User already exists");
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ fullName, username, email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                setSuccess("Registration successful! You can now log in.");
                setError(""); // Clear error message if any
                e.target.reset(); // Optionally reset the form
            } else {
                setError("Error registering user");
            }
        } catch (error) {
            setError("Error registering user");
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="bg-white p-8 rounded-lg border-t-4 border-green-400 shadow-lg">
                <h2 className="text-xl font-bold my-4">Enter your details</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="text"
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded"

                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button className="bg-green-600 text-white font-bold py-2 px-6 cursor-pointer">
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white font-bold w-fit text-sm p-2 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500 text-white font-bold w-fit text-sm p-2 rounded">
                            {success}
                        </div>
                    )}
                </form>
                <Link className="text-sm mt-3 text-right block" href="/">
                    Already have an account? <span className="underline">Login</span>
                </Link>
            </div>
        </div>
    );
}
