import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date?.replace("Z", "")).format("DD/MM/YYYY HH:mm ");
};
