import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, Banknote } from 'lucide-react';

const PaymentMethod = ({ handleChange, formData }) => {
  let paymentMethods = [

    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng (COD)',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
      icon: 'cash',
      enabled: true
    },
    {
      id: 'bank_transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua ngân hàng',
      icon: 'bank',
      enabled: true
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán qua ví điện tử MoMo',
      icon: 'momo',
      enabled: true
    },
    {
      id: 'vnpay',
      name: 'VNPay',
      description: 'Thanh toán qua VNPay',
      icon: 'vnpay',
      enabled: true
    }
  ]
    ;
  const [selectedMethod, setSelectedMethod] = useState(formData.payment_method || 'cod');





  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    handleChange({
      target: {
        name: 'payment_method',
        value: methodId
      }
    });
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'cash':
        return <Banknote className="w-5 h-5" />;
      case 'bank':
        return <Building2 className="w-5 h-5" />;
      case 'momo':
        return <Smartphone className="w-5 h-5" />;
      case 'vnpay':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedMethod === method.id
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
              } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              name="PAYMENT"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodChange(method.id)}
              disabled={!method.enabled}
              className="sr-only"
            />

            <div className="flex items-center space-x-3 flex-1">
              <div className={`p-2 rounded-full ${selectedMethod === method.id ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                {getIcon(method.icon)}
              </div>

              <div className="flex-1">
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>

              {selectedMethod === method.id && (
                <div className="w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Payment method specific information */}
      {selectedMethod === 'bank_transfer' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Thông tin chuyển khoản</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Ngân hàng:</strong> Vietcombank</p>
            <p><strong>Số tài khoản:</strong> 1234567890</p>
            <p><strong>Chủ tài khoản:</strong> Công ty TNHH Ecommerce</p>
            <p><strong>Nội dung:</strong> THANH TOAN DON HANG [Mã đơn hàng]</p>
          </div>
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Banknote className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">
              Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
