import { useQuery, useMutation } from '@tanstack/react-query'
import * as WishListServices from '@/services/WishListServices'
import { useAuthStore } from '@/store/useAuthStore'

const useWishList = () => {
    const user = useAuthStore((state) => state.user)
    const getWishListByUserQuery = useQuery({
        queryKey: ['getWishListByUser', user?.id],
        queryFn: async () => WishListServices.getWishListByUser(),
        enabled: !!user?.id
    })

    const createWishListByUserMutation = useMutation({
        mutationFn: async (data) => WishListServices.createWishListByUser(data),
        onSuccess: () => getWishListByUserQuery.refetch()
    })
    const deleteWishListByUserMutation = useMutation({
        mutationFn: async ({ product_id }) => WishListServices.deleteWishListByUser(product_id),
        onSuccess: () => getWishListByUserQuery.refetch()

    })
    return {
        loading: getWishListByUserQuery.isLoading,
        wishlist: getWishListByUserQuery.data,
        error: getWishListByUserQuery.error,

        createWishList: createWishListByUserMutation.mutateAsync,
        deleteWishList: deleteWishListByUserMutation,
        isCreating: createWishListByUserMutation.isPending,
        isDeleting: deleteWishListByUserMutation.isPending
    }


}

export default useWishList;