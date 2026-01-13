
import { getReviewByID, postReview } from '@/services/Reviews'
import { useQuery, useMutation } from '@tanstack/react-query'

import useOrderDetails from '@/hooks/useOrderDetails'

const useReview = (productId) => {

    const { GetOrderDetail } = useOrderDetails();
    const GetReviewByID = useQuery({
        queryKey: ['GetReviewByID', productId],
        queryFn: async () => await getReviewByID(productId),
        enabled: !!productId
    })
    const PostReview = useMutation({
        mutationFn: async (data) => postReview(data),
        onSuccess: () => GetOrderDetail.refetch()
    })

    return {
        GetReviewByID,
        PostReview,
    }
}

export default useReview