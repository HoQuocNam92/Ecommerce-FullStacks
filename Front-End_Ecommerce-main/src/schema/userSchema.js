import * as yup from "yup";

export const userSchema = yup.object({
    name: yup.string().required("Vui lòng nhập tên").min(2, "Vui lòng nhập tên ").trim(),
    email: yup.string().email("Vui lòng nhập đúng định dạng Email").required("Vui lòng nhập Email").trim(),
    gender: yup.string().nullable(),
    phone: yup.string().notRequired().nullable().when([], {
        is: (x) => x !== null && x !== undefined && x !== '',
        then: yup.string().matches(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/, "Vui lòng nhập đúng định dạng Số điện thoại"),
    }),
    bio: yup.string().nullable(),
    newPassword: yup
        .string()
        .nullable()
        .test(
            "min-if-filled",
            "Vui lòng nhập mật khẩu tối thiểu 6 kí tự",
            (value) => {
                if (!value) return true; // bỏ qua nếu trống
                return value.length >= 6;
            }
        ),
    confirmPassword: yup
        .string()
        .nullable()
        .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
        .test("match-if-filled", "Mật khẩu không khớp", function (value) {
            const { newPassword } = this.parent;
            if (!newPassword) return true; // skip nếu password trống
            return value === newPassword;
        })
});
