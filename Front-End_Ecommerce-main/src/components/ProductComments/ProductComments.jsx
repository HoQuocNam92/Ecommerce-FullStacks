import useComments from "@/hooks/useComments";
import { useState } from "react";

export default function ProductComments({ productId, userId }) {
    const { comments, addComment } = useComments(productId);
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = () => {
        addComment({ productId, userId, rating, comment: text, imageUrl });
        setText("");
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Đánh giá sản phẩm</h3>

            {/* Form gửi comment */}
            <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                            onClick={() => setRating(i + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập nhận xét..."
                    className="border rounded-lg p-2 w-full"
                />

                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="URL hình ảnh (tùy chọn)"
                    className="border rounded-lg p-2 w-full"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                >
                    Gửi đánh giá
                </button>
            </div>

            {/* Danh sách bình luận */}
            <div className="flex flex-col gap-4">
                {comments.map((c, i) => (
                    <div key={i} className="border p-3 rounded-lg bg-white shadow-sm">
                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                            {"★".repeat(c.rating)}
                        </div>
                        <p className="text-gray-700 mb-2">{c.comment}</p>
                        {c.imageUrl && (
                            <img
                                src={c.imageUrl}
                                alt="Review"
                                className="w-32 h-32 object-cover rounded"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
