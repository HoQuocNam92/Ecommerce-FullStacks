import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Bắt buộc nhập email"),
    password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Bắt buộc nhập mật khẩu"),
});

export const signupSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Bắt buộc nhập email"),
    name: yup.string().min(2, "Tên phải có ít nhất 2 ký tự").required("Bắt buộc nhập tên"),
    password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Bắt buộc nhập mật khẩu"),
});
