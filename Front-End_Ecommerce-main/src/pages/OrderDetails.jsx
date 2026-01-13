import React, { useRef, useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Star,
  MessageSquare,
  XCircle,
  Calendar,
  User
} from 'lucide-react';


import useOrderDetails from '@/hooks/useOrderDetails';
import Spiner from '@/components/Spiner/Spiner';
import dayjs from 'dayjs';
import { Button } from '@/components/ui';
import { Link, useNavigate } from 'react-router-dom';
import getStatusInfo from '@/utils/statusOrder';
import FeedbackForm from '@/components/Feedback/FeedbackForm';
import useReview from '@/hooks/useReview';
const OrderDetails = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null)
  const { GetOrderDetail } = useOrderDetails();
  const { PostReview } = useReview()

  const navigate = useNavigate();


  const FormRef = useRef()
  const handleReviews = async (data) => {
    setIsOpen(true)
    setSelectItem(data)
  }

  const statusInfo = getStatusInfo(GetOrderDetail?.data?.data?.status);

  if (GetOrderDetail.isLoading) {
    return <Spiner />
  }
  return (
    <div ref={FormRef} className="container py-4">

      <div >
        <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow mb-6">
          <Package className="w-6 h-6 text-red-700" />
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">#{GetOrderDetail?.data?.data.order_code}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                    <statusInfo.icon className="w-4 h-4 inline mr-1" />
                    {statusInfo.label}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date(GetOrderDetail?.data?.data.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div className="space-y-4">
                {GetOrderDetail?.data?.data.timeline.map((step, index) => {
                  const StepIcon = step.status === 'pending' ? Clock :
                    step.status === 'confirmed' ? CheckCircle :
                      step.status === 'shipped' ? Truck :
                        step.status === 'delivered' ? CheckCircle : Clock;

                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-green-700
                        }`}>
                        <StepIcon className={`w-4 h-4 step.completed  text-white'  
                          }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-500">{step?.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {dayjs(step.timestamp).format('HH:mm DD/MM/YYYY')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm đã đặt</h3>
              <div className="space-y-4">
                {GetOrderDetail?.data?.data.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between space-x-4 p-4 border border-gray-200 rounded-lg">
                    <Link to={`/product/${item.slug}`} className="flex items-center  ">
                      <img
                        src={item?.thumbnail}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 ms-2">
                        <h4 className="font-medium text-gray-900">{item.product_name}</h4>

                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </Link>
                    <div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </p>
                        {GetOrderDetail?.data?.data.status === 'delivered' && item.reviewed === 0 && (

                          <>

                            <p className='flex items-center'>

                              <span className='ms-1'>
                                <Button onClick={() => handleReviews(item)}>
                                  <Star className="w-4 h-4" />
                                  Đánh giá
                                </Button>
                              </span></p>
                          </>
                        )}
                        {item.reviewed === 1 && (
                          <div className="mt-2   flex items-center space-x-1 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Đã đánh giá</span>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                ))}
                {isOpen &&
                  <FeedbackForm PostReview={PostReview} setIsOpen={setIsOpen} open={isOpen} isPending={PostReview.isPending} orderId={GetOrderDetail?.data?.data?.id} onOpenChange={setIsOpen} product={selectItem} />}

              </div>
            </div>
          </div>


          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giao hàng</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{GetOrderDetail?.data?.data.shipping_address[0]?.full_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{GetOrderDetail?.data?.data.shipping_address[0]?.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="text-gray-700">{GetOrderDetail?.data?.data.shipping_address[0]?.address_detail}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium text-gray-900">
                    {GetOrderDetail?.data?.data.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' :
                      GetOrderDetail?.data?.data.payment_method === 'bank_transfer' ? 'Chuyển khoản' :
                        GetOrderDetail?.data?.data.payment_method === 'momo' ? 'MoMo' : 'VNPay'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vận chuyển:</span>
                  <span className="font-medium text-gray-900">{GetOrderDetail?.data?.data.shipping_method}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                    <span className="text-xl font-bold text-red-700">
                      {GetOrderDetail?.data?.data.total_amount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác</h3>
              <div className="space-y-3">
                {statusInfo.label === "Chờ xác nhận" && (
                  <Button className='w-full'>
                    <XCircle className="w-5 h-5" />
                    <span>Hủy đơn hàng</span>
                  </Button>
                )}


                <Button className='w-full' onClick={() => navigate('/contact')}>
                  <MessageSquare className="w-5 h-5" />
                  <span>Liên hệ hỗ trợ</span>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>


    </div >
  );
};




export default OrderDetails;

