const Payment = {
    tableName: 'payments',
    columns: {
        order_id: 'order_id',
        method: 'method',
        status: 'status',
        paid_at: 'paid_at'
    }
};

export default Payment;
