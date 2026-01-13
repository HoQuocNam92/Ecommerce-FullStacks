import * as yup from "yup";
export const formCheckOutSchema = yup.object().shape({
  full_name: yup.string().required("Nhập tên đầy đủ").min(4),
  address_type: yup.string().required("Nhập địa chỉ cụ thể").min(12),
  phone: yup
    .string()
    .matches(/^\d{9,11}$/, "Số điện thoại không hợp lệ")
    .required(),
  email: yup.string().email().required("Nhập email để nhận khuyến mãi"),
  SHIPPING: yup.string().required("Chọn đơn vị vận chuyển"),
});
