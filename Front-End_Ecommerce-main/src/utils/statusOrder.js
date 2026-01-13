import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";

const getStatusInfo = (status) => {
    const statusMap = {
        pending: {
            label: 'Chờ xác nhận',
            color: 'bg-yellow-100 text-yellow-800',
            icon: Clock
        },
        confirmed: {
            label: 'Đã xác nhận',
            color: 'bg-blue-100 text-blue-800',
            icon: CheckCircle
        },
        shipped: {
            label: 'Đang giao hàng',
            color: 'bg-orange-100 text-orange-800',
            icon: Truck
        },
        delivered: {
            label: 'Đã giao hàng',
            color: 'bg-green-100 text-green-800',
            icon: CheckCircle
        },
        cancelled: {
            label: 'Đã hủy',
            color: 'bg-red-100 text-red-800',
            icon: XCircle
        }
    };
    return statusMap[status] || statusMap.pending;
};

export default getStatusInfo;