import * as yup from "yup";

export const addressSchema = yup.object({
    full_name: yup
        .string()
        .required("Vui lòng nhập tên đầy đủ")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Tên không được chứa số hoặc ký tự đặc biệt")
        .trim(),

    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(9, "Số điện thoại phải tối thiểu 9 số")
        .max(11, "Số điện thoại tối đa 11 số")
        .trim(),

    address_detail: yup
        .string()
        .required("Vui lòng nhập địa chỉ")
        .trim(),

    province_code: yup
        .string()
        .required("Vui lòng chọn tỉnh/thành phố"),

    district_code: yup
        .string()
        .required("Vui lòng chọn quận/huyện"),

    ward_code: yup
        .string()
        .required("Vui lòng chọn phường/xã"),
});
