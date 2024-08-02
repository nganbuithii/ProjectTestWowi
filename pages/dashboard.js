
import { useUser } from '../contexts/UserContext'; 
import Menu from '../components/menu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/notFound');
        }
    }, [user, router]);

    return (
        <div className="flex flex-col min-h-screen bg-custom pt-20 p-4">
            {user ? (
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="animate-bounce text-5xl font-extrabold text-center text-white drop-shadow-lg">
                        Chào mừng {user.name} đến với trang của Ngân
                    </h1>
                    <p className="text-lg font-bold"> {user ? user._id : ''}</p>

                </div>
            ) : null}
            <Menu />
        </div>
    );
}
