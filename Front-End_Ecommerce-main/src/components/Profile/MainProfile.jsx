import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/schema/userSchema";
import Input from "@/components/Common/Input";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit3,
  Camera
} from "lucide-react";
import dayjs from "dayjs";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import Spiner from "../Spiner/Spiner";
import useAuthActions from "@/hooks/useAuthActions";
const MainProfile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [img, setImg] = useState("");
  const { logout } = useAuthActions();
  const fileRef = useRef();
  const imageRef = useRef();
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleImage = (e) => {
    const url = URL.createObjectURL(e.target?.files[0])
    setImg(url);
    setFormData({ ...formData, avatar: e.target?.files[0] })
  }
  const { updateProfile, getProfile } = useUser();


  const user = getProfile?.data;


  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    birth: user?.birth || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
    avatar: user?.avatar
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = (fd) => {
    updateProfile.mutate(fd);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData()
    if (formData?.avatar instanceof File) {
      fd.append("avatar", formData?.avatar)
    }

    for (let key in formData) {
      if (key !== "avatar") {
        fd.append(key, formData[key])

      }
    }
    userSchema.validate({ ...formData })
      .then(async () => await handleSave(fd))
      .catch((e) => toast.error(e.errors))

  };
  if (getProfile?.isLoading) {
    return <Spiner />;
  }

  if (getProfile?.isError) {
    logout();
    return null;
  }
  let loading = updateProfile.isPending;
  return (
    <main className="flex-1">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-red-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Thông tin cá nhân
              </h2>
            </div>
            {!isEditing && (
              <Button onClick={handleEdit}>
                <Edit3 className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </Button>
            )}
          </div>
        </div>


        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {
                    formData?.avatar ?
                      <img className="w-full h-full object-contain rounded-full" src={img || formData?.avatar} alt={formData?.name} />
                      :
                      <img ref={imageRef} className="w-full h-full object-contain rounded-full" src="https://res.cloudinary.com/djl5vwhjm/image/upload/v1763167859/download_1_ulsu5s.jpg" alt={formData?.name} />
                  }
                </div>
                {isEditing && (
                  <>
                    <input onChange={handleImage} type="file" ref={fileRef} id="avatar" name="avatar" hidden />

                    <Button onClick={() => fileRef.current.click()} className="absolute top-3 -right-5 w-5 h-5" type="button">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </>

                )}

              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {formData?.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Thông tin cơ bản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Họ và tên</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-3 py-2 ${isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
                      }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Số điện thoại</span>
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-3 py-2 ${isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
                      }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email"
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-3 py-2 ${isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                    }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Giới tính
                </label>
                <div className="flex items-center space-x-4">
                  {["Nam", "Nữ", "Khác"].map((g) => (
                    <label key={g} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData?.gender === g}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-red-700 focus:ring-red-400"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ngày sinh</label>

                <Input
                  type="date"
                  name="birth"
                  value={
                    formData?.birth
                      ? dayjs(formData?.birth).format("YYYY-MM-DD")
                      : ""
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-3 py-2 ${isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                    }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tiểu sử / Giới thiệu
                </label>
                <textarea
                  name="bio"
                  value={formData?.bio || ""}
                  onChange={handleChange}
                  placeholder="Giới thiệu ngắn gọn về bạn..."
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-3 py-2 min-h-[80px] resize-none ${isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                    }`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Thay đổi mật khẩu
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Mật khẩu hiện tại</span>
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData?.currentPassword}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu hiện tại"
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-3 py-2 pr-10 ${isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
                      }`}
                  />
                  <Button
                    type="button"
                    className="absolute top-1 right-0"
                    onClick={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                    disabled={!isEditing}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Mật khẩu mới + xác nhận */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Mật khẩu mới", name: "newPassword", show: showNewPassword, setShow: setShowNewPassword },
                  { label: "Xác nhận mật khẩu", name: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword },
                ].map(({ label, name, show, setShow }) => (
                  <div key={name} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <div className="relative">
                      <Input
                        type={show ? "text" : "password"}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={label}
                        disabled={!isEditing}
                        className={`w-full border rounded-lg px-3 py-2 pr-10 ${isEditing
                          ? "border-gray-300 bg-white"
                          : "border-gray-200 bg-gray-50"
                          }`}
                      />
                      <Button
                        type="button"
                        className="absolute top-1 right-0"
                        onClick={() => setShow(!show)}
                        disabled={!isEditing}
                      >
                        {show ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button type="button" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex items-center space-x-2 bg-red-700 text-white hover:bg-red-600"
                >
                  {loading ? <>

                    <div>

                      <span >Loading...</span>
                    </div>

                  </>
                    :
                    (
                      <>
                        <Save className="w-4 h-4" />
                        <div>
                          Lưu
                        </div>
                      </>
                    )

                  }

                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default MainProfile;
