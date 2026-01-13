import { GetProductDetails, GetProductRelated } from "@/services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const useProductDetails = () => {
  const { slug } = useParams();

  const getProductDetails = useQuery({
    queryKey: ['getProductDetails', slug],
    queryFn: async () => await GetProductDetails(slug)
    ,
    enabled: !!slug
  })



  const getProductRelated = useQuery({
    queryKey: ["product-related", getProductDetails?.data?.id],
    queryFn: async () => await GetProductRelated(getProductDetails?.data?.id, getProductDetails?.data?.category_id),
    enabled: !!getProductDetails?.data?.id,
    staleTime: 1000 * 60 * 5,
    retry: 2
  })
  return {
    getProductDetails,
    getProductRelated,
  };
};

export default useProductDetails;
