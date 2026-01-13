import * as PaymentRepo from './payment.repositories.js';
import * as OrderService from '../order/order/order.services.js';
import * as CartService from '../cart/cart.services.js';

export const getPayments = () => PaymentRepo.getAllPayments();

export const getPaymentById = (id) => PaymentRepo.getPaymentById(id);

export const createPayment = (data) => PaymentRepo.createPayment(data);

export const updatePayment = (id, data) => PaymentRepo.updatePayment(id, data);

export const cancelPayment = (id) => PaymentRepo.cancelPayment(id);

export const getPaymentMethods = () => {
    return [
        {
            id: 'cod',
            name: 'Thanh toán khi nhận hàng (COD)',
            description: 'Thanh toán bằng tiền mặt khi nhận hàng',
            icon: 'cash',
            enabled: true
        },
        {
            id: 'bank_transfer',
            name: 'Chuyển khoản ngân hàng',
            description: 'Chuyển khoản qua ngân hàng',
            icon: 'bank',
            enabled: true
        },
        {
            id: 'momo',
            name: 'Ví MoMo',
            description: 'Thanh toán qua ví điện tử MoMo',
            icon: 'momo',
            enabled: true
        },
        {
            id: 'zalopay',
            name: 'ZaloPay',
            description: 'Thanh toán qua ZaloPay',
            icon: 'zalopay',
            enabled: true
        },
        {
            id: 'vnpay',
            name: 'VNPay',
            description: 'Thanh toán qua VNPay',
            icon: 'vnpay',
            enabled: true
        }
    ];
};

export const processPayment = async (orderId, paymentMethod, paymentData) => {
    try {
        // Lấy thông tin đơn hàng
        const order = await OrderService.getOrder(orderId);
        if (!order) {
            throw new Error('Đơn hàng không tồn tại');
        }

        // Kiểm tra trạng thái đơn hàng
        if (order.status !== 'pending') {
            throw new Error('Đơn hàng không thể thanh toán');
        }

        // Tạo thanh toán
        const paymentInfo = {
            order_id: orderId,
            method: paymentMethod,
            status: 'pending',
            amount: order.total_amount,
            ...paymentData
        };

        const payment = await PaymentRepo.createPayment(paymentInfo);

        // Xử lý thanh toán theo phương thức
        let result;
        switch (paymentMethod) {
            case 'cod':
                result = await processCODPayment(payment);
                break;
            case 'bank_transfer':
                result = await processBankTransferPayment(payment);
                break;
            case 'momo':
                result = await processMoMoPayment(payment);
                break;
            case 'zalopay':
                result = await processZaloPayPayment(payment);
                break;
            case 'vnpay':
                result = await processVNPayPayment(payment);
                break;
            default:
                throw new Error('Phương thức thanh toán không được hỗ trợ');
        }

        return result;
    } catch (error) {
        throw new Error(`Lỗi xử lý thanh toán: ${error.message}`);
    }
};

const processCODPayment = async (payment) => {
    // COD không cần xử lý gì thêm
    await PaymentRepo.updatePayment(payment.id, { status: 'completed' });
    await OrderService.updateOrder(payment.order_id, { status: 'confirmed' });
    
    return {
        success: true,
        message: 'Đơn hàng đã được xác nhận. Bạn sẽ thanh toán khi nhận hàng.',
        paymentId: payment.id
    };
};

const processBankTransferPayment = async (payment) => {
    // Tạo thông tin chuyển khoản
    const bankInfo = {
        bankName: 'Vietcombank',
        accountNumber: '1234567890',
        accountName: 'Công ty TNHH Ecommerce',
        amount: payment.amount,
        content: `THANH TOAN DON HANG ${payment.order_id}`
    };

    await PaymentRepo.updatePayment(payment.id, { 
        status: 'pending',
        bank_info: JSON.stringify(bankInfo)
    });

    return {
        success: true,
        message: 'Vui lòng chuyển khoản theo thông tin bên dưới',
        bankInfo,
        paymentId: payment.id
    };
};

const processMoMoPayment = async (payment) => {
    // Giả lập tích hợp MoMo API
    const momoData = {
        partnerCode: 'MOMO_PARTNER_CODE',
        orderId: payment.order_id,
        amount: payment.amount,
        orderInfo: `Thanh toán đơn hàng ${payment.order_id}`,
        returnUrl: `${process.env.FRONTEND_URL}/payment/success`,
        notifyUrl: `${process.env.BACKEND_URL}/api/payment/momo/callback`
    };

    // Trong thực tế sẽ gọi API MoMo
    const paymentUrl = `https://payment.momo.vn/v2/gateway/pay?${new URLSearchParams(momoData)}`;

    await PaymentRepo.updatePayment(payment.id, { 
        status: 'pending',
        payment_url: paymentUrl
    });

    return {
        success: true,
        message: 'Chuyển hướng đến MoMo để thanh toán',
        paymentUrl,
        paymentId: payment.id
    };
};

const processZaloPayPayment = async (payment) => {
    // Giả lập tích hợp ZaloPay API
    const zalopayData = {
        app_id: 'ZALOPAY_APP_ID',
        app_trans_id: payment.order_id,
        app_user: payment.user_id,
        amount: payment.amount,
        description: `Thanh toán đơn hàng ${payment.order_id}`,
        callback_url: `${process.env.BACKEND_URL}/api/payment/zalopay/callback`
    };

    // Trong thực tế sẽ gọi API ZaloPay
    const paymentUrl = `https://sb-openapi.zalopay.vn/v2/create?${new URLSearchParams(zalopayData)}`;

    await PaymentRepo.updatePayment(payment.id, { 
        status: 'pending',
        payment_url: paymentUrl
    });

    return {
        success: true,
        message: 'Chuyển hướng đến ZaloPay để thanh toán',
        paymentUrl,
        paymentId: payment.id
    };
};

const processVNPayPayment = async (payment) => {
    // Giả lập tích hợp VNPay API
    const vnpayData = {
        vnp_Amount: payment.amount * 100, // VNPay yêu cầu số tiền tính bằng xu
        vnp_Command: 'pay',
        vnp_CreateDate: new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, ''),
        vnp_CurrCode: 'VND',
        vnp_IpAddr: '127.0.0.1',
        vnp_Locale: 'vn',
        vnp_OrderInfo: `Thanh toán đơn hàng ${payment.order_id}`,
        vnp_OrderType: 'other',
        vnp_ReturnUrl: `${process.env.FRONTEND_URL}/payment/success`,
        vnp_TmnCode: 'VNPAY_TMN_CODE',
        vnp_TxnRef: payment.order_id,
        vnp_Version: '2.1.0'
    };

    // Trong thực tế sẽ tạo chữ ký và gọi API VNPay
    const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${new URLSearchParams(vnpayData)}`;

    await PaymentRepo.updatePayment(payment.id, { 
        status: 'pending',
        payment_url: paymentUrl
    });

    return {
        success: true,
        message: 'Chuyển hướng đến VNPay để thanh toán',
        paymentUrl,
        paymentId: payment.id
    };
};
