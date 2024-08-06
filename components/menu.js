// components/Menu.js
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext';

export default function Menu() {
    const router = useRouter();
    const { user } = useUser();

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 w-full flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-50">
            <h2 className="text-2xl font-semibold">Naniti website test</h2>
            <div className="flex-grow flex justify-center">
                <ul className="flex space-x-4">
                    <li>
                        <button
                            onClick={() => handleNavigation('/dashboard')}
                            className="p-2 hover:bg-purple-700 rounded transition duration-300"
                        >
                            Trang chủ
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/profile')}
                            className="p-2 hover:bg-purple-700 rounded transition duration-300"
                        >
                            Hồ sơ
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-lg font-bold">{user ? user.name : ''}</p>
                <img
                    src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <button
                    onClick={handleLogout}
                    className="p-2 bg-red-600 hover:bg-red-500 rounded transition duration-300"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
