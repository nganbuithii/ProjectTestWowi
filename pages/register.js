import { useForm } from 'react-hook-form';
import '../app/globals.css';
import Link from 'next/link';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Xử lý dữ liệu khi submit
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký tài khoản</h2>

                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-2">Họ và tên</label>
                    <input
                        id="fullName"
                        {...register('fullName', { required: 'Họ và tên không được để trống' })}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                    <input
                        id="username"
                        {...register('username', { required: 'Username không được để trống' })}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                    <input
                        id="password"
                        {...register('password', { required: 'Mật khẩu không được để trống' })}
                        type="password"
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <p className="text-sm text-gray-600 mt-4">
                    Bạn đã có tài khoản?{' '}
                    <Link href="/login" className="text-blue-500 hover:text-blue-700 transition duration-200">
                        Đăng nhập
                    </Link>
                </p>

                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-3 rounded w-full font-semibold hover:bg-blue-600 transition duration-200"
                >
                    Đăng kí
                </button>
            </form>
        </div>
    );
}
