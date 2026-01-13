import { motion } from "framer-motion";
import { ToUnitMoney } from "@/utils/ToUnitMoney";
import OrderItem from "./OrderItem.jsx";
import { formatDate } from "@/utils/formatDate.js";
import { Link } from "react-router-dom";
const OrderCard = ({ order }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
        <div>
          <p className="font-semibold">Order ID: {order.id}</p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.created_at)}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
              ? "bg-green-100 text-green-600"
              : order.status === "Shipping"
                ? "bg-blue-100 text-blue-600"
                : order.status === "Processing"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <OrderItem key={order.id} order={order} />
      </div>

      <div className="flex justify-between items-center border-t mt-4 pt-4">
        <p className="font-semibold text-lg">
          Total: {ToUnitMoney(order.total_amount)}
        </p>
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition">
          <Link to={`/user/order-details/${order?.id}`}>View Details</Link>
        </button>
      </div>
    </motion.div>
  );
};

export default OrderCard;
