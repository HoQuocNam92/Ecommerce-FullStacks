import * as yup from "yup";





export const formCheckOutSchema = yup.object().shape({
    address_id: yup.string().required("Vui lòng chọn địa chỉ giao hàng"),
    payment_method: yup.string().required("Vui lòng chọn phương thức thanh toán"),
})
