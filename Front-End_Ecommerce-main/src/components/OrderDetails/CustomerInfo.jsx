const CustomerInfo = ({ orderDetails }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-2">Thông tin nhận hàng</h2>
            <p><span className="font-medium">Người nhận:</span> {orderDetails.name}</p>
            <p><span className="font-medium">SĐT:</span> {orderDetails.phone}</p>
            <p><span className="font-medium">Địa chỉ:</span> {orderDetails.shipping_address}</p>
        </div>
    );
};

export default CustomerInfo;
