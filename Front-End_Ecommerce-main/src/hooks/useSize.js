import { useState, useEffect } from 'react';
import { GetSizes } from '@/services/SizeServices'; // Import service đã tạo


const useSize = () => {
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Khai báo hàm fetch data bên trong useEffect
        const fetchSizes = async () => {
            try {
                setLoading(true);
                setError(null);

                // Gọi hàm từ service
                const data = await GetSizes();

                // Cập nhật state
                setSizes(data);

            } catch (err) {
                // Xử lý lỗi (ví dụ: lỗi mạng, lỗi API)
                setError(err.message || "Không thể tải danh sách kích thước.");
                setSizes([]); // Xóa danh sách nếu có lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchSizes();

    }, []); // Chỉ chạy một lần khi component được mount

    return { sizes, loading, error };
};

export default useSize;