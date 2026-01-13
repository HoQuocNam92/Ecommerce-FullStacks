import { ToUnitMoney } from "@/utils/ToUnitMoney";

const PaymentSummary = ({ orderDetails }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
                <p>Tạm tính:</p>
                <p>{ToUnitMoney(orderDetails.total_amount)}</p>
            </div>
            <div className="flex justify-between">
                <p>Phí vận chuyển:</p>
                <p>{ToUnitMoney(0)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
                <p>Tổng cộng:</p>
                <p>{ToUnitMoney(orderDetails.total_amount)}</p>
            </div>
        </div>
    );
};

export default PaymentSummary;
