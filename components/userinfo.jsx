// "use client";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import Navbar from "./navbar";

// export default function UserInfo() {
//     return (

//         <div> <Navbar />
//             <div className="grid place-items-center h-screen">
//                 <div className="bg-white p-8 rounded-lg border-t-4 border-green-400 shadow-lg">
//                     <h2 className="text-xl font-bold my-4"> User Info</h2>
//                     <div className="flex flex-col gap-3">
//                         <div className="p-2 border border-gray-300 rounded">
//                             <span className="font-bold">Name:</span>
//                         </div>
//                         <div className="p-2 border border-gray-300 rounded">
//                             <span className="font-bold">Email:</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );

// }

"use client";
import Navbar from "./Navbar"; // Adjust the import path if necessary
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { data: session } = useSession();
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">About This Blog</h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to our blog! This platform is dedicated to sharing insightful articles and stories on a variety of topics. Whether you're interested in technology, lifestyle, or personal growth, you'll find content designed to engage, inform, and inspire.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Our team of writers and contributors are passionate about delivering high-quality, well-researched, and thought-provoking content. We aim to foster a community where readers can connect, discuss, and share their own ideas and experiences.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Stay tuned for updates and new posts. Feel free to reach out if you have any questions or suggestions. We hope you enjoy your visit and find value in the content we provide!
                        </p>
                        <div className="border-t border-gray-300 mt-6 pt-4">
                            <h3 className="text-xl font-semibold mb-2">User Information</h3>
                            <div className="flex flex-col gap-3">
                                {session?.user && (
                                    <div className="p-2 border border-gray-300 rounded">
                                        <span className="font-bold">Name: </span>
                                        <span className="text-lg text-gray-900">{session?.user?.fullName || "User"}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
