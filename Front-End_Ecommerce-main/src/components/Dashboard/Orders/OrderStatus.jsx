// const validStatuses = ['pending', 'rejected', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled', 'returned'];

import {
    CheckCircle,
    Clock,
    Truck,
    AlertCircle,
    RefreshCcw,
    XCircle,
    PackageCheck,
} from "lucide-react";

const statusConfig = {
    pending: {
        label: "Pending",
        class: "bg-gray-100 text-gray-700 border border-gray-300",
        icon: Clock,
    },
    confirmed: {
        label: "Confirmed",
        class: "bg-yellow-50 text-yellow-700 border border-yellow-300",
        icon: PackageCheck,
    },
    processing: {
        label: "Processing",
        class: "bg-orange-50 text-orange-700 border border-orange-300",
        icon: Clock,
    },
    shipping: {
        label: "Shipping",
        class: "bg-blue-50 text-blue-700 border border-blue-300",
        icon: Truck,
    },
    delivered: {
        label: "Delivered",
        class: "bg-green-50 text-green-700 border border-green-300",
        icon: CheckCircle,
    },
    cancelled: {
        label: "Cancelled",
        class: "bg-red-50 text-red-700 border border-red-300",
        icon: XCircle,
    },
    rejected: {
        label: "Rejected",
        class: "bg-pink-50 text-pink-700 border border-pink-300",
        icon: AlertCircle,
    },
    returned: {
        label: "Returned",
        class: "bg-purple-50 text-purple-700 border border-purple-300",
        icon: RefreshCcw,
    },
};


export default function OrderStatus(status) {
    const s =
        statusConfig[String(status)?.toLowerCase()] ||
        {
            label: String(status || "—"),
            class: "bg-gray-100 text-gray-800",
            icon: AlertCircle,
        };

    const Icon = s.icon || AlertCircle;

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.class}`}
        >
            <Icon className="w-3 h-3" />
            {s.label}
        </span>
    );
}
