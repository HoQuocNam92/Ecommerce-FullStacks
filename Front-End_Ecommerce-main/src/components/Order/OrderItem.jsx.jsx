import { ToUnitMoney } from "@/utils/toUnitMoney";

const OrderItem = ({ order }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={order.thumbnail}
          alt={order.name}
          className="w-24 h-24 rounded-md object-contain"
        />
        <div>
          <p className="font-medium">{order.name}</p>
          <p className="text-sm text-gray-500">
            Quantity: {order.quantity} × {ToUnitMoney(order.price)}
          </p>
        </div>
      </div>
      <p className="font-semibold">{ToUnitMoney(order.total_amount)}</p>
    </div>
  );
};

export default OrderItem;
