import * as yup from 'yup'



export const staffSchema = yup.object({
    name: yup.string().required("Bắt buộc nhập tên").min(2, "Vui lòng nhập tên đúng định dạng ").trim(),
    email: yup.string().email("Vui lòng nhập email").required("Bắt buộc nhập email").trim(),
    phone: yup.string().required("Vui lòng nhập số điện thoại").when([], {
        is: (x) => x !== null && x !== undefined && x !== '',
        then: yup.string().matches(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/, "Vui lòng nhập đúng định dạng Số điện thoại"),
    }),
    avatar: yup.mixed().test("required", "Vui lòng chọn ảnh đại diện", value => value instanceof File),
    gender: yup.string().oneOf(['nam', 'nữ', 'khác']).required('Chọn giới tính'),
    status: yup.string().required('Chọn trạng thái'),
    role_id: yup.string().required('Chọn vai trò'),
    birth: yup
        .date()
        .required('Ngày sinh bắt buộc')
        .max(
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            'Nhân viên phải đủ 18 tuổi'
        ),



})
