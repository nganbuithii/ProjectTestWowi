import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import '../app/globals.css';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const onSubmit = async (data) => {

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng nhập</h2>
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                    {...register('username', { required: 'Username không được để trống' })}
                    placeholder="Username"
                    className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                    <input
                        {...register('password', { required: 'Mật khẩu không được để trống' })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <AiFillEye color="blue" size={24} /> :<AiFillEyeInvisible color="blue" size={24} />}
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                <p className="text-sm text-gray-600 mt-4">
                    Bạn chưa có tài khoản?{' '}
                    <Link href="/register" className="text-blue-500 hover:text-blue-700 transition duration-200">
                        Đăng kí
                    </Link>
                </p>
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-3 rounded w-full font-semibold hover:bg-blue-600 transition duration-200"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}