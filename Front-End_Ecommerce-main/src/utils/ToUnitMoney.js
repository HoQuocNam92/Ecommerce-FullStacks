export const ToUnitMoney = (money) => {
  return Number(money).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export default ToUnitMoney;
