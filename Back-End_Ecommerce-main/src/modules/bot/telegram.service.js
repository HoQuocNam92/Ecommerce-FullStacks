import axios from "axios"

const botToken = process.env.TELEGRAM_BOT_TOKEN
const url_bot = process.env.url_bot


import * as OrderService from '../order/order/order.services.js'
export const sendMessage = async (message, option = {}) => {

  const chatId = process.env.TELEGRAM_CHAT_ID
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const url_bot = process.env.url_bot


  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'html',
    ...option

  }
  const res = await axios.post(`${url_bot}${botToken}/sendMessage`, payload, {
    timeout: 100000
  })

  return {
    success: true,
    messageId: res.data.result.message_id
  }
}


export const sendOrderNotification = async (data) => {
  const { orderNumber, order_id, customerName, customerPhone, totalAmount, items, shippingAddress, paymentMethod } = data;



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  let itemsText = items.map(x => `🚀 ${x.product_name}  x${x.quantity} - ${formatCurrency(x.price)}`).join("\n");

  const message = `
🛒 <b>ĐƠN HÀNG MỚI</b>

📋 <b>Mã đơn:</b> ${orderNumber}
👤 <b>Khách hàng:</b> ${customerName}
📞 <b>Số điện thoại:</b> ${customerPhone}
💰 <b>Tổng tiền:</b> ${formatCurrency(totalAmount)}
💳 <b>Phương thức:</b> ${paymentMethod}

📍 <b>Địa chỉ giao hàng:</b>
${shippingAddress}

🛍️ <b>Sản phẩm:</b>
${itemsText}

⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
  `;

  const option =
  {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '✅Xác nhận đơn hàng',

            callback_data: `confirm_${orderNumber}_${order_id}`
          },
          {
            text: '❌Từ chối đơn hàng',
            callback_data: `rejected_${orderNumber}_${order_id}`
          }
        ]
      ]
    }

  }
  return await sendMessage(message, option);
}



export const handleMessage = async (bot) => {
  if (!bot.callback_query) {
    throw new Error("Xác nhận bot bị lỗi")
  }
  const query = bot.callback_query;
  const chatIid = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  const [action, code_order, order_id] = data.split("_")

  if (action === 'confirm') {
    await axios.post(`${url_bot}${botToken}/editMessageText`, {
      chat_id: chatIid,
      message_id: messageId,
      text: `✅ Đơn hàng ${code_order} đã được xác nhận`
    })
    await OrderService.updateOrderStatus(order_id, "confirmed")
  }
  else if (action === 'cancelled') {
    await axios.post(`${url_bot}${botToken}/editMessageText`, {
      chat_id: chatIid,
      message_id: messageId,
      text: `✅ Đơn hàng ${code_order} đã bị từ chối`
    })
    await OrderService.updateOrderStatus(order_id, "cancelled")

  }
  await axios.post(`${url_bot}${botToken}/answerCallbackQuery`, {
    callback_query_id: query.id,
    text: "Đã xử lý yêu cầu!",
  })
}
