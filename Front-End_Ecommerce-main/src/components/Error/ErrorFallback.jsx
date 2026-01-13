// src/components/Error/ErrorFallback.jsx
export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 text-red-700">
            <h1 className="text-2xl font-bold mb-2">Đã xảy ra lỗi 😢</h1>
            <p className="mb-4">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Thử lại
            </button>
        </div>
    );
}
