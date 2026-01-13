import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  XCircle,
  Calendar,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import getStatusInfo from '../../utils/statusOrder';

const OrderManagement = ({ Orders }) => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);





  return (
    <main className="flex-1 container-fluid">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">


        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="processing">Đang chuẩn bị</option>
                <option value="shipped">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>


          <div className="space-y-4">
            {Orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Package className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Không có đơn hàng nào.</p>
                <Button className='mt-2' onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
              </div>
            ) :
              (
                Orders?.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <Link to={`/order/${order.id}`} key={order.id} >
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">#{order.order_code}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {statusInfo.label}
                            </span>
                          </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 truncate">
                              {order.address_detail}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {order.payment_method === 'cod' ? 'COD' :
                                order.payment_method === 'bank_transfer' ? 'Chuyển khoản' :
                                  order.payment_method === 'momo' ? 'MoMo' :
                                    order.payment_method === 'vnpay' ? 'VNPay' : 'Khác'}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                  {item.name} × {item.quantity}
                                </div>
                              ))}
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                {order.total_amount.toLocaleString('vi-VN')}₫
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
                )

              )


            }
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chi tiết đơn hàng #{selectedOrder.id}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Trạng thái đơn hàng</h4>
                <div className="flex items-center space-x-2">
                  {(() => {
                    const statusInfo = getStatusInfo(selectedOrder.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <>
                        <StatusIcon className="w-5 h-5" />
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sản phẩm</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                  <span className="text-xl font-bold text-red-700">
                    {selectedOrder.total_amount.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default OrderManagement;
