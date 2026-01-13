import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as CouponService from '@/services/CouponServices'
import { useState } from 'react'

const useCoupons = () => {
    const queryClient = useQueryClient()
    const [code, setCode] = useState('');
    // GET ALL
    const getCoupons = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await CouponService.getAllCoupon()
            return res.data.data
        }
    })

    const getCounponByCode = useQuery({
        queryKey: ['coupons', code],
        queryFn: async () => {
            const res = await CouponService.getCouponByCode(code)
            return res.data.data
        },
        enabled: !!code
    })
    // CREATE
    const createCoupon = useMutation({
        mutationFn: (data) => CouponService.createCoupon(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
        }
    })

    // UPDATE
    const updateCoupon = useMutation({
        mutationFn: ({ id, data }) => CouponService.updateCoupon(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
        }
    })

    // DELETE
    const deleteCoupon = useMutation({
        mutationFn: (id) => CouponService.deleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
        }
    })

    return {
        coupons: getCoupons.data || [],
        isLoading: getCoupons.isLoading,
        errors:
            getCoupons.error ||
            createCoupon.error ||
            updateCoupon.error ||
            deleteCoupon.error ||
            getCounponByCode.error,

        createCoupon: createCoupon.mutateAsync,
        updateCoupon: updateCoupon.mutateAsync,
        deleteCoupon: deleteCoupon.mutateAsync,

        isCreating: createCoupon.isPending,
        isUpdating: updateCoupon.isPending,
        isDeleting: deleteCoupon.isPending,

        coupon: getCounponByCode?.data,
        setCode,
    }
}

export default useCoupons
