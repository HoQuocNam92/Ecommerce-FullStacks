import React, { useEffect, useState } from 'react';
import { ToUnitMoney } from "@/utils/ToUnitMoney";
import { ShoppingBag, Truck, Tag, CreditCard, PlusCircle, MapPin, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ handleChange, setFormData, formData, cart, shipping_method, coupon, address }) => {
  const navigate = useNavigate();
  const max_discount_amount = coupon?.max_discount_amount;
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectShipping, setSelectShipping] = useState(shipping_method?.[0]);
  const subtotal = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = coupon ? coupon.discount_percent : 0;
  const total = subtotal + Number(selectShipping?.fee) - (((subtotal * discount) / 100) > max_discount_amount ? max_discount_amount : ((subtotal * discount) / 100));

  const handleAddAddress = () => navigate('/account/address/add');
  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setShowAddressOptions(false);

  };

  useEffect(() => {
    if (address && address.length > 0 && Object.keys(selectedAddress).length === 0) {
      setSelectedAddress(address[0]);
    }
    if (address && address.length > 0 && cart.length > 0) {
      setFormData(prev => ({
        ...prev,
        address_id: selectedAddress.id,
        products: cart,
        coupon_code: coupon?.code || "",
        shippe_fee: selectShipping?.fee,
        total_amount: subtotal,
        final_amount: total,
      }));
    }

  }, [selectedAddress, cart, selectShipping?.fee, subtotal, total, address]);



  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <ShoppingBag className="w-5 h-5 text-red-700" />
          <h3 className="text-lg font-semibold text-gray-900">Tóm tắt đơn hàng</h3>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-red-700" />
            <h4 className="text-md font-semibold text-gray-800">Giao tới</h4>
          </div>

          {Object.keys(selectedAddress).length > 0 ? (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{selectedAddress.full_name}</p>
                  <p className="text-gray-700">{selectedAddress.phone}</p>
                  <p className="text-gray-600 text-sm">{selectedAddress.address_detail}</p>
                </div>
                <button
                  className="text-red-700 hover:text-red-600 text-sm flex items-center"
                  onClick={() => setShowAddressOptions(!showAddressOptions)}
                >
                  Thay đổi <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>

              {showAddressOptions && (
                <div className="mt-3 border-t border-gray-200 pt-2 space-y-2">
                  {address?.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectAddress(addr)}

                      className={`p-2 rounded-lg cursor-pointer border ${selectedAddress.id === addr.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-400'
                        } flex justify-between`}
                    >
                      <div>
                        <p className="font-medium">{addr.full_name}</p>
                        <p className="text-sm text-gray-600">{addr.address_detail}</p>
                      </div>
                      {selectedAddress.id === addr.id && (
                        <Check className="w-4 h-4 text-red-700" />
                      )}
                    </div>
                  ))}

                  <button
                    onClick={handleAddAddress}
                    className="flex items-center space-x-1 text-red-700 hover:text-red-600 text-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Thêm địa chỉ mới</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300 flex items-center justify-between">
              <p className="text-gray-600">Chưa có địa chỉ giao hàng</p>
              <button
                className="flex items-center space-x-1 text-red-700 hover:text-red-600 font-medium"
                onClick={handleAddAddress}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm địa chỉ mới</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {ToUnitMoney(item.price)} × {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {ToUnitMoney(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="shipping_method">Chọn đơn vị vận chuyển</label>
          <select name="shipping_method" id="shipping_method" value={formData.shipping_method || ""}
            onChange={(e) => { setSelectShipping(shipping_method.find(x => x.id == e.target.value)), handleChange({ target: { name: "shipping_method", value: e.target.value } }) }}>

            {
              shipping_method?.map((x) => (
                <option value={x.id}>{x.name} - {ToUnitMoney(x.fee)}</option>
              ))
            }

          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú đơn hàng (tuỳ chọn)
          </label>
          <textarea
            id="note"
            name="note"
            rows="3"
            placeholder="Ví dụ: Giao giờ hành chính, không gọi trước..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            value={formData.note || ""}
            onChange={(e) => handleChange({ target: { name: "note", value: e.target.value } })}
          />
        </div>
        {/* --- Tổng tiền --- */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-600">
            <span>Tạm tính:</span>
            <span>{ToUnitMoney(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Phí vận chuyển:</span>
            </div>
            <span>{ToUnitMoney(selectShipping?.fee)}</span>
          </div>

          {coupon && (
            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Giảm giá ({coupon.code}):</span>
              </div>
              <span>-{ToUnitMoney((subtotal * discount) / 100 > max_discount_amount ? max_discount_amount : ((subtotal * discount) / 100))}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
              <span className="text-lg font-bold text-red-700">{ToUnitMoney(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Thanh toán an toàn và bảo mật</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
