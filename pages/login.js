
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../app/globals.css';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useUser(); 

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const onSubmit = async (data) => {
        try {
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('username', data.username);
            urlEncodedData.append('password', data.password);

            const response = await fetch('http://localhost:8100/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData.toString(),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.data.access_token);
                // console.log("ACESSS_TOKEN", result.data.access_token)
                
                // Lưu thông tin người dùng vào context
                login(result.data.user);

                router.push('/dashboard');
            } else {
                setErrorMessage(result.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
            }
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg)' }}>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng nhập</h2>
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        {...register('username', { required: 'Username không được để trống' })}
                        placeholder="Username"
                        className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200  text-black"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    <label className="block text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <input
                            {...register('password', { required: 'Mật khẩu không được để trống' })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200  text-black"
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <AiFillEye color="black" size={24} /> :<AiFillEyeInvisible color="black" size={24} />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <p className="text-sm text-gray-600 mt-4">
                        Bạn chưa có tài khoản?{' '}
                        <Link href="/register" className="text-pink-600 hover:text-red-700 transition duration-200">
                            Đăng kí
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="mt-2 bg-pink-400 text-white p-3 rounded w-full font-semibold hover:bg-pink-700 transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}
