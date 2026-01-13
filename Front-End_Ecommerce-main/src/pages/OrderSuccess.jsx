import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, ArrowRight, Download, Share2 } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData || {};

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    navigate('/user/order');
  };

  const handleDownloadInvoice = () => {
    // Implement download invoice functionality
    console.log('Downloading invoice for order:', orderData.id);
  };

  const handleShareOrder = () => {
    // Implement share order functionality
    if (navigator.share) {
      navigator.share({
        title: 'Đơn hàng của tôi',
        text: `Tôi vừa đặt hàng thành công! Mã đơn hàng: ${orderData.id}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Đơn hàng của tôi - Mã: ${orderData.id}`);
    }
  };

  return (
    <div className="container bg-gray-50 py-4 rounded-2xl ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xác nhận.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Thông tin đơn hàng
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium text-gray-900">#{orderData.id || 'ORD-001'}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Ngày đặt hàng:</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-bold text-red-700 text-lg">
                    {orderData.totalAmount?.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium text-gray-900">
                    {orderData.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' :
                      orderData.paymentMethod === 'bank_transfer' ? 'Chuyển khoản ngân hàng' :
                        orderData.paymentMethod === 'momo' ? 'Ví MoMo' :
                          orderData.paymentMethod === 'vnpay' ? 'VNPay' : 'Chưa xác định'}
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-gray-600 block mb-2">Địa chỉ giao hàng:</span>
                  <span className="font-medium text-gray-900">
                    {orderData.shippingAddress || 'Chưa có thông tin địa chỉ'}
                  </span>
                </div>

              </div>

              {/* {orderData.items && orderData.items.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Sản phẩm đã đặt
                  </h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity} × {item.price?.toLocaleString('vi-VN')}₫
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {(item.price * item.quantity)?.toLocaleString('vi-VN')}₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
              {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Cần hỗ trợ?
                </h3>
                <p className="text-blue-800 text-sm mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, hãy liên hệ với chúng tôi.
                </p>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>📞 Hotline: 1900 1234</p>
                  <p>📧 Email: support@ecommerce.com</p>
                  <p>💬 Chat: Trực tuyến 24/7</p>
                </div>
              </div> */}
            </div>
          </div>

          <div className="space-y-6">
            {/* Order Status */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trạng thái đơn hàng
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Đơn hàng đã được tạo</p>
                    <p className="text-sm text-gray-500">Đang chờ xác nhận</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Đang chuẩn bị</p>
                    <p className="text-sm text-gray-400">Chưa bắt đầu</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Đang giao hàng</p>
                    <p className="text-sm text-gray-400">Chưa bắt đầu</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Giao hàng thành công</p>
                    <p className="text-sm text-gray-400">Chưa hoàn thành</p>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thao tác
              </h3>

              <div className="space-y-3">
                <button
                  onClick={handleViewOrder}
                  className="w-full flex items-center justify-center space-x-2 bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <Package className="w-5 h-5" />
                  <span>Xem đơn hàng</span>
                </button>

                <button
                  onClick={handleDownloadInvoice}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Tải hóa đơn</span>
                </button>

                <button
                  onClick={handleShareOrder}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Chia sẻ</span>
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Tiếp tục mua sắm</span>
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;