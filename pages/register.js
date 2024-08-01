import { useForm } from 'react-hook-form';
import '../app/globals.css';


export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);  // Xử lý dữ liệu khi submit
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký tài khoản</h2>

                <input
                    {...register('fullName', { required: 'Full name is required' })}
                    placeholder="Full Name"
                    className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                <input
                    {...register('username', { required: 'Username is required' })}
                    placeholder="Username"
                    className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded w-full font-semibold hover:bg-blue-600 transition duration-200"
                >
                    Đăng kí
                </button>
            </form>
        </div>
    );
}
