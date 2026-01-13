import { ToUnitMoney } from "@/utils/ToUnitMoney";

const OrderItems = ({ orderDetails }) => {
    return (
        <div>
            <h2 className="font-semibold mb-3">Sản phẩm</h2>
            <div className="space-y-4">
                <div key={orderDetails.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center space-x-4">
                        <img src={orderDetails.thumbnail} alt={orderDetails.name} className="w-22 h-22 rounded-md object-contain" />
                        <div>
                            <p className="font-medium">{orderDetails.nameItem}</p>
                            <p className="text-sm text-gray-500">
                                Quantity: {orderDetails.quantity} × {ToUnitMoney(orderDetails.price)}
                            </p>
                        </div>
                    </div>
                    <p className="font-semibold">{ToUnitMoney(orderDetails.total_amount)}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderItems;
