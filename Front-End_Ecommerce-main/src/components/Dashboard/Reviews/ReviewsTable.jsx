import { useEffect, useState } from "react";
import { getAllReviews, updateReviewStatus, deleteReview } from "@/services/Reviews";
import ReactStars from "react-rating-stars-component";
import { Button } from "@/components/ui";

const ReviewsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await getAllReviews();
            setRows(data || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const onStatus = async (id, status) => {
        await updateReviewStatus(id, status);
        await load();
    };
    const onDelete = async (id) => {
        await deleteReview(id);
        await load();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Quản lý đánh giá</h2>
            <div className="overflow-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left">Sản phẩm</th>
                            <th className="px-3 py-2 text-left">Người dùng</th>
                            <th className="px-3 py-2 text-left">Sao</th>
                            <th className="px-3 py-2 text-left">Bình luận</th>
                            <th className="px-3 py-2 text-left">Ngày</th>
                            <th className="px-3 py-2">Trạng thái</th>
                            <th className="px-3 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id} className="border-t">
                                <td className="px-3 py-2 max-w-[220px] truncate">{r.product_name}</td>
                                <td className="px-3 py-2">{r.user_name}</td>
                                <td className="px-3 py-2"><ReactStars count={5} value={r.rating} edit={false} size={16} activeColor="#f59e0b" /></td>
                                <td className="px-3 py-2 max-w-[360px] truncate" title={r.comment}>{r.comment}</td>
                                <td className="px-3 py-2">{new Date(r.created_at).toLocaleString('vi-VN')}</td>
                                <td className="px-3 py-2">{r.status || 'pending'}</td>
                                <td className="px-3 py-2 flex gap-2 justify-center">
                                    <Button size="sm" onClick={() => onStatus(r.id, 'approved')}>Duyệt</Button>
                                    <Button size="sm" variant="outline" onClick={() => onStatus(r.id, 'hidden')}>Ẩn</Button>
                                    <Button size="sm" variant="destructive" onClick={() => onDelete(r.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                        {!rows.length && !loading && (
                            <tr><td className="px-3 py-6 text-center" colSpan={7}>Chưa có dữ liệu</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewsTable;




