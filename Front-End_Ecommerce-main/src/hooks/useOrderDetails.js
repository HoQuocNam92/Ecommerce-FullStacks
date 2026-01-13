
import { GetOrderDetails } from "@/services/OrderDetailServices";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
const useOrderDetails = () => {
  const { order_id } = useParams();
  const account = useAuthStore((state) => state.user);



  const GetOrderDetail = useQuery({
    queryKey: ["GetOrderDetail", order_id],
    queryFn: () => GetOrderDetails(order_id),
    enabled: !!account && !!order_id,

  })


  return {
    GetOrderDetail
  };
};

export default useOrderDetails;
