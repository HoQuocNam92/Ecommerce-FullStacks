import React, { useState } from "react";

const FeedbackSection = ({ feedbacks }) => {


    const [filterRating, setFilterRating] = useState(null);
    const [filterImage, setFilterImage] = useState(false);

    const filtered = feedbacks?.filter((fb) => {
        if (filterRating && fb.rating !== filterRating) return false;
        if (filterImage && fb.images.length === 0) return false;
        return true;
    });

    const avgRating =
        (feedbacks?.reduce((s, fb) => s + fb.rating, 0) / feedbacks.length).toFixed(1);



    return (
        <div className="bg-white p-5 rounded-xl mt-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">ĐÁNH GIÁ SẢN PHẨM</h2>

            <div className="flex items-center gap-5 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-6">
                <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500">{avgRating}</div>
                    <div className="text-gray-500">trên 5</div>
                </div>

                <div>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-yellow-400 text-2xl">★</span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={() => { setFilterRating(null); setFilterImage(false); }}
                    className={`${filterRating === null && !filterImage
                        ? "bg-orange-100 border-orange-500 text-orange-600 font-semibold"
                        : "bg-gray-100 border-gray-300"
                        } px-4 py-2 rounded-full border`}
                >
                    Tất cả
                </button>

                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        onClick={() => setFilterRating(star)}
                        className={`${filterRating === star
                            ? "bg-orange-100 border-orange-500 text-orange-600 font-semibold"
                            : "bg-gray-100 border-gray-300"
                            } px-4 py-2 rounded-full border`}
                    >
                        {star} Sao
                    </button>
                ))}

                <button
                    onClick={() => setFilterImage(!filterImage)}
                    className={`${filterImage
                        ? "bg-orange-100 border-orange-500 text-orange-600 font-semibold"
                        : "bg-gray-100 border-gray-300"
                        } px-4 py-2 rounded-full border`}
                >
                    Có Hình Ảnh / Video
                </button>
            </div>

            {filtered?.map((fb) => (
                <div key={fb.id} className="border-b border-gray-200 pb-5 mb-5">
                    <div className="flex items-center mb-3">
                        <img className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl mr-4" src={fb.avatar} alt={fb.name} />

                        <div>
                            <strong className="block">{fb.name}</strong>
                            <span className="text-xs text-gray-500">{fb.created_at}</span>
                        </div>
                    </div>

                    <div className="mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span
                                key={s}
                                className={`${s <= fb.rating ? "text-yellow-400" : "text-gray-300"} text-xl`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">{fb.comment}</p>

                    <div className="flex flex-wrap gap-3">
                        {fb?.gallery?.map((item, idx) => (
                            <img
                                key={idx}
                                src={item.url}
                                alt=""
                                className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                            />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
};

export default FeedbackSection;
