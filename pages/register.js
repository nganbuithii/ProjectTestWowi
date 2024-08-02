import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'; // Đừng quên import useRouter
import { useState } from 'react';
import '../app/globals.css';
import Link from 'next/link';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter(); // Khởi tạo router

    const onSubmit = async (data) => {
        try {
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('name', data.fullName);
            urlEncodedData.append('email', data.username);
            urlEncodedData.append('password', data.password);

            const response = await fetch('http://localhost:8100/api/v1/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData.toString(),
            });

            const result = await response.json();

            if (response.ok) {
                router.push('/login');
                console.log("RESS",response);
                alert('Đăng ký thành công!');
            } else {
                setErrorMessage(result.message || 'Đăng ký không thành công. Vui lòng thử lại.');
            }
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/realistic-glassmorphism-background_52683-86678.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký tài khoản</h2>

                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-2">Họ và tên</label>
                    <input
                        id="fullName"
                        {...register('fullName', { required: 'Họ và tên không được để trống' })}
                        className="border border-gray-300 p-3 w-full rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                    <input
                        id="username"
                        {...register('username', { required: 'Username không được để trống' })}
                        className="border border-gray-300 p-3 w-full rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                    <input
                        id="password"
                        {...register('password', { required: 'Mật khẩu không được để trống' })}
                        type="password"
                        className="border border-gray-300 p-3 w-full rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

                <p className="text-sm text-gray-600 mt-4">
                    Bạn đã có tài khoản?{' '}
                    <Link href="/login" className=" text-pink-600 hover:text-red-600 transition duration-200">
                        Đăng nhập
                    </Link>
                </p>

                <button
                    type="submit"
                    className="mt-2 bg-pink-400 text-white p-3 rounded w-full font-semibold hover:bg-pink-700 transition duration-200"
                >
                    Đăng kí
                </button>
            </form>
        </div>
    );
}
