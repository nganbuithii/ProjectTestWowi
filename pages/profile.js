import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Menu from '../components/menu';
import { useUser } from '../contexts/UserContext';

export default function Profile() {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await fetch('http://localhost:8100/api/v1/users/current', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUser(data.data);
                setEditedUser(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [setUser]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const updatedData = {};
            if (editedUser.name !== user.name) updatedData.name = editedUser.name;
            if (editedUser.email !== user.email) updatedData.email = editedUser.email;

            if (Object.keys(updatedData).length === 0) {
                alert('Bạn chưa cập nhật thông tin mới');
                return;
            }

            const response = await fetch('http://localhost:8100/api/v1/users', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: user._id,
                    email: editedUser.email,
                    name: editedUser.name
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUser(data.data);
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pt-20 p-6">
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <p className="text-xl font-semibold text-gray-700">Loading...</p>
                    </div>
                </div>
                <Menu />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pt-20 p-6">
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="w-full max-w-md mx-auto p-6 bg-red-100 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold text-red-700">Error: {error}</p>
                    </div>
                </div>
                <Menu />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pt-20 p-6">
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg flex">
                    <div className="flex-shrink-0 bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-l-lg">
                        <div className="flex flex-col items-center">
                            {/* Vì api em chưa làm avtar nên em xin phép gán cứng */}
                            <img
                                className="w-24 h-24 rounded-full mb-4"
                                src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg"
                                alt="User Avatar"
                            />
                            <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
                            <p className="text-white">{user.role ? user.role.name : 'User'}</p>
                            <button
                                onClick={handleEditClick}
                                className="mt-4 px-4 py-2 bg-white text-orange-500 rounded-full transition-transform transform hover:scale-105"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow p-6">
                        <h3 className="text-xl font-semibold mb-4">Thông tin hồ sơ</h3>
                        {isEditing ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={editedUser.name || ''}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={editedUser.email || ''}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded text-black"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveClick}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Cập nhật hồ sơ
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex mb-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Email:</span> {user.email}
                                        </p>
                                    </div>
                                    <div className="w-1/2">
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Phone:</span> 0987 998 998
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <a href="#" className="text-blue-500 mx-2">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="text-blue-400 mx-2">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="text-pink-500 mx-2">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
