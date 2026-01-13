import { CheckCircle, Package, Settings, Truck } from "lucide-react";
import dayjs from "dayjs";

const statusSteps = [
    { label: "Pending", icon: Package, status: "Đang xử lí" },
    { label: "Processing", icon: Settings, status: "Đang chuẩn bị gửi hàng" },
    { label: "Shipping", icon: Truck, status: "Đang giao hàng" },
    { label: "Delivered", icon: CheckCircle, status: "Hàng đã được giao" },
];

const OrderStatus = ({ orderDetails }) => {
    const currentIndex = statusSteps.findIndex(s => s.label === orderDetails.status);

    return (
        <div>
            <h2 className="font-semibold mb-3">Trạng thái đơn hàng</h2>
            <div className="flex items-center justify-between">
                {statusSteps.map((step, index) => {
                    const isActive = currentIndex >= index;
                    const Icon = step.icon;
                    return (
                        <div key={step.label} className="flex-1 flex flex-col items-center relative">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mb-2 z-20 ${isActive ? "bg-green-700 border-green-500 text-white" : "border-gray-300 text-gray-400"}`}>
                                <Icon className="w-full h-7 my-2" />
                            </div>
                            <p className={`text-sm ${isActive ? "text-green-600 font-medium" : "text-gray-400"}`}>
                                {step.status}
                            </p>
                            {index < currentIndex && <div className={`absolute top-4 left-1/2 w-full h-1 z-10 ${isActive ? "bg-green-700" : "bg-gray-300"}`} />}
                        </div>
                    );
                })}
            </div>
            <p className="text-sm text-gray-500 mt-2">
                Dự kiến giao: {dayjs(orderDetails.expected_delivery).format("DD/MM/YYYY HH:mm")}
            </p>
        </div>
    );
};

export default OrderStatus;
