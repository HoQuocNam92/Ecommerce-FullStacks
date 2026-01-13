import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Check,
  Phone,
  User,
  Home
} from 'lucide-react';
import useAddress from '@/hooks/useAddress';
import useLocation from '@/hooks/useLocation';
import { Button } from '../ui';
import { useNavigate } from 'react-router-dom';
const AddressManagement = () => {
  const { setSelectedProvince, setSelectedDistrict, setSelectedWard } = useLocation();
  const [addresses, setAddresses] = useState([]);
  const { GetAddress, Add_Address, UpdateAddress, DeleteAddress } = useAddress()

  let navigate = useNavigate();



  const handleEdit = (address) => {
    setSelectedProvince(address.province_code)
    setSelectedDistrict(address.district_code)
    setSelectedWard(address.ward_code)

    // setFormData({
    //   id: address.id,
    //   full_name: address.full_name,
    //   phone: address.phone,
    //   address_type: '',
    //   address_detail: address.address_detail,
    //   province_code: address.province_code,
    //   district_code: address.district_code,
    //   ward_code: address.ward_code,
    //   is_default: address.is_default
    // });
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      await DeleteAddress.mutateAsync(addressId)
    }
  };

  const handleSetDefault = async (addressId) => {
    const updatedAddresses = addresses.find(x => x.id === addressId);
    await UpdateAddress.mutateAsync({ ...updatedAddresses, is_default: true })
  };

  useEffect(() => {
    if (GetAddress?.data) {
      setAddresses(GetAddress?.data?.data)
    }
  }, [GetAddress?.data?.data])

  return (
    <main className="flex-1">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-red-700" />
              <h2 className="text-xl font-semibold text-gray-900">Sổ địa chỉ</h2>
            </div>
            <button
              onClick={() => (navigate('add'))}
              className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm địa chỉ</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {GetAddress?.isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Đang tải...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có địa chỉ nào</h3>
              <p className="text-gray-500 mb-6">Thêm địa chỉ để giao hàng nhanh hơn</p>
              <Button
                onClick={() => navigate('add')}

              >
                Thêm địa chỉ mới
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses?.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg ${address.is_default
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{address.full_name}</span>
                        {address.is_default && (
                          <span className="bg-red-700 text-white text-xs px-2 py-1 rounded-full">
                            Mặc định
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{address.phone}</span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Home className="w-4 h-4 text-gray-500 mt-1" />
                        <div className="text-gray-700">
                          <p>{address.address_detail}</p>
                          <p>{address.ward_name}, {address.district_name}, {address.province_name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!address.is_default && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="Đặt làm mặc định"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(address)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-red-700 hover:text-red-700 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>



    </main >
  );
};

export default AddressManagement;

