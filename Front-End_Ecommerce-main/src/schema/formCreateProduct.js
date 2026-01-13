import * as yup from 'yup'

export const formCreateProduct = yup.object({
    name: yup
        .string()
        .required('Tên sản phẩm không được để trống')
        .min(3, 'Tên sản phẩm tối thiểu 3 ký tự'),

    categoryId: yup
        .string()
        .required('Vui lòng chọn danh mục'),

    price: yup
        .number()
        .typeError('Giá phải là số')
        .required('Giá không được để trống')
        .min(0, 'Giá phải >= 0'),

    attributes: yup
        .array()
        .of(
            yup.object({
                key: yup
                    .string()
                    .required('Tên thuộc tính không được để trống'),
                value: yup
                    .string()
                    .required('Giá trị thuộc tính không được để trống')
            })
        )
        .optional(),

    variants: yup
        .array()
        .of(
            yup.object({
                size: yup
                    .string()
                    .required('Size không được để trống'),
                color: yup
                    .string()
                    .required('Màu không được để trống'),
                quantity: yup
                    .number()
                    .typeError('Số lượng phải là số')
                    .required('Số lượng không được để trống')
                    .min(0, 'Số lượng phải >= 0')
            })
        )
        .optional(),

    images: yup
        .array()
        .of(
            yup.mixed().test(
                'fileOrUrl',
                'Chỉ chấp nhận ảnh',
                (value) => {
                    if (typeof value === 'string') {
                        return value.startsWith('https')
                    }

                    if (value instanceof File) {
                        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
                    }

                    return false
                }
            )
        )
        .min(1, 'Vui lòng chọn ít nhất 1 hình ảnh'),
    description: yup
        .string()
        .required('Mô tả không được để trống')
})
