import React from "react";

const FeedbackEmpty = () => {
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-sm">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    className="text-gray-300"
                    fill="currentColor"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                        10-4.48 10-10S17.52 2 12 2zm0 3
                        c1.1 0 2 .9 2 2s-.9 2-2 2
                        -2-.9-2-2 .9-2 2-2zm0
                        14c-2.33 0-4.31-1.46-5.11-3.5h10.22
                        c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Chưa có đánh giá nào
            </h3>

            <p className="text-gray-500 mb-6">
                Hãy là người đầu tiên chia sẻ cảm nhận của bạn về sản phẩm này.
            </p>


        </div>
    );
};

export default FeedbackEmpty;
