import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "../ui";
import useLocation from "@/hooks/useLocation";
import useAddress from "@/hooks/useAddress";
import { addressSchema } from "@/schema/addressSchema";
import { toast } from "sonner";
const AddAddressPage = () => {
    const { GetAddress, Add_Address, UpdateAddress, DeleteAddress } = useAddress()
    const { provinces, districts, wards, selectedDistrict, selectedWard, setSelectedProvince, selectedProvince, setSelectedDistrict, setSelectedWard } = useLocation();
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address_detail: '',
        province_code: "",
        district_code: "",
        ward_code: "",
        is_default: true
    });
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isValid = await addressSchema.validate(formData, { abortEarly: false })
            if (isValid) {
                await Add_Address.mutateAsync(formData)

            }
            toast.success("Thêm địa chỉ thành công!")
            navigate(-1)

        } catch (error) {
            toast.error(error?.errors[0])
        }
    };

    const setProvince = (e) => {
        const value = e.target.value;
        setSelectedProvince(value)

        setFormData((prev) => ({ ...prev, province_code: value, district_code: "" }))
    }

    const setDistrict = (e) => {
        const value = e.target.value;
        setSelectedDistrict(value)
        setFormData((prev) => ({ ...prev, district_code: value, ward_code: "" }))
    }
    const setWard = (e) => {
        const value = e.target.value;
        setSelectedWard(value)
        setFormData((prev) => ({ ...prev, ward_code: value }))
    }
    // const handleEdit = (address) => {
    //     setSelectedProvince(address.province_code)
    //     setSelectedDistrict(address.district_code)
    //     setSelectedWard(address.ward_code)

    //     setFormData({
    //         id: address.id,
    //         full_name: address.full_name,
    //         phone: address.phone,
    //         address_type: '',
    //         address_detail: address.address_detail,
    //         province_code: address.province_code,
    //         district_code: address.district_code,
    //         ward_code: address.ward_code,
    //         is_default: address.is_default
    //     });
    // };

    return (
        <div className="flex-1">


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <MapPin className="w-5 h-5 text-red-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Thêm địa chỉ mới</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="">
                            <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên người nhận"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Tỉnh / Thành phố</label>
                            <select
                                value={selectedProvince}
                                onChange={setProvince}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Chọn tỉnh</option>
                                {provinces.map((prov) => (
                                    <option key={prov.code} value={prov.code}>
                                        {prov.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Quận / Huyện</label>
                            <select
                                value={selectedDistrict}
                                onChange={setDistrict}
                                disabled={!selectedProvince}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            >
                                <option value="">Chọn huyện</option>
                                {districts.map((d) => (
                                    <option key={d.code} value={d.code}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phường / Xã</label>
                            <select
                                value={selectedWard}
                                onChange={setWard}
                                disabled={!selectedDistrict}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                            >
                                <option value="">Chọn phường</option>
                                {wards.map((w) => (
                                    <option key={w.code} value={w.code}>
                                        {w.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Địa chỉ chi tiết</label>
                        <textarea
                            name="address_detail"
                            value={formData.address_detail}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Ví dụ: 123 Đường ABC, Phường DEF"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                        ></textarea>
                    </div>



                    <div className="flex items-center space-x-2">
                        <input
                            id="isDefault"
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="isDefault" className="text-gray-700">
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 px-6 py-2 rounded-lg"
                        >
                            Hủy
                        </Button>

                        <Button
                            type="submit"
                            className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Lưu địa chỉ</span>
                        </Button>
                    </div>
                </form>

                {GetAddress?.isLoading && <p className="text-sm text-gray-500 mt-4">Đang tải dữ liệu...</p>}
            </div>
        </div>
    );
}
export default AddAddressPage;