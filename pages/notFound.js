
export default function notFound() {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url('https://comodosslstore.com/blog/wp-content/uploads/2024/01/page-not-found.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl mb-4">Trang bạn tìm không tồn tại.</p>
                <a
                    href="/login"
                    className="text-blue-400 hover:text-blue-300"
                >
                Đăng nhập
                </a>
            </div>
        </div>
    );
}
