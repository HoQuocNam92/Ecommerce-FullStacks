import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as FlashSale from '@/services/FlashSaleServices'
const useFlashSale = () => {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['product-sale'],
        queryFn: async () => {
            const res = await FlashSale.getProductSale()
            return res.data.data
        }
    })

    const createMutation = useMutation({
        mutationFn: FlashSale.createProductSale,
        onSuccess: () => queryClient.invalidateQueries(['product-sale'])
    })

    const updateMutation = useMutation({
        mutationFn: FlashSale.updateProductSale,
        onSuccess: () => queryClient.invalidateQueries(['product-sale'])
    })

    const deleteMutation = useMutation({
        mutationFn: FlashSale.deleteProductSale,
        onSuccess: () => queryClient.invalidateQueries(['product-sale'])
    })

    return {
        promotions: query.data || [],
        isLoading: query.isLoading,
        error: query.error,

        createPromotion: createMutation.mutateAsync,
        updatePromotion: updateMutation.mutateAsync,
        deletePromotion: deleteMutation.mutateAsync,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    }
}

export default useFlashSale
