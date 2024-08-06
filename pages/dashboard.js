import { useRouter } from "next/router";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import Menu from "../components/menu";

export default function Dashboard() {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/notFound');
        }
    }, [user, router]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-pink-300">
            <Menu />
            <div className="flex flex-grow items-center justify-center p-10">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                    <div className="p-10 flex flex-col justify-center bg-gray-200">
                        <h1 className="text-6xl font-bold text-gray-800 mb-4">Hello,</h1>
                        <h2 className="text-6xl font-bold text-gray-800 mb-4">I'm {user?.name}</h2>
                        <p className="text-gray-600 mb-4">
                            Welcome to my website. I'm glad you opened my website. I am taking the internship test of wowi company. I feel so happy when you watch it
                        </p>
                    </div>
                    <div className="relative w-96 h-96"> 
                        <img 
                            src="https://png.pngtree.com/png-clipart/20230228/original/pngtree-gnome-pool-summer-hello-blue-poster-png-image_8967645.png" 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-2 left-2 bg-red-500 w-10 h-10 rounded-full"></div> 
                    </div>
                </div>
            </div>
        </div>
    );
}
