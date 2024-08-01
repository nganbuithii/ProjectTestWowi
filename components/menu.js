// components/Menu.js
import { useRouter } from 'next/router';

export default function Menu() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className="bg-gray-800 text-white p-4 w-full max-w-xs rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <ul>
                <li>
                    <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="block p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600 w-full text-left"
                    >
                        Trang chủ
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleNavigation('/profile')}
                        className="block p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600 w-full text-left"
                    >
                        Hồ sơ
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleNavigation('/settings')}
                        className="block p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600 w-full text-left"
                    >
                        Cài đặt
                    </button>
                </li>
            </ul>
        </div>
    );
}
