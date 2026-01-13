import Payment from './payment.models.js';

export const getAllPayments = async () => Payment.findAll();
export const getPaymentById = async (id) => Payment.findByPk(id);
export const createPayment = async (data) => Payment.create(data);
export const updatePayment = async (id, data) => Payment.update(data, { where: { id } });
export const deletePayment = async (id) => Payment.destroy({ where: { id } });
export const cancelPayment = async (id) => Payment.update({ status: 'cancelled' }, { where: { id } });
export const getPaymentsByOrder = async (orderId) => Payment.findAll({ where: { order_id: orderId } });
export const getPaymentsByUser = async (userId) => {
    return Payment.findAll({ where: { user_id: userId } });
};