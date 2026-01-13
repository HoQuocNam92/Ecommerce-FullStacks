import { formatDate } from "@/utils/formatDate";

const OrderHeader = ({ orderDetails }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-600";
            case "Shipping":
                return "bg-blue-100 text-blue-600";
            case "Processing":
                return "bg-purple-100 text-purple-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    return (
        <div className="flex justify-between items-center border-b pb-4">
            <div>
                <p className="font-semibold text-lg">Order ID: {orderDetails.id}</p>
                <p className="text-sm text-gray-500">
                    Ngày đặt: {formatDate(orderDetails.created_at)}
                </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(orderDetails.status)}`}>
                {orderDetails.status}
            </span>
        </div>
    );
};

export default OrderHeader;
