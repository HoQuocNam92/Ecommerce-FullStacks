import { useMutation, useQuery } from '@tanstack/react-query'
import * as bannerServices from '@/services/BannerServices'

const useBanner = (page) => {



    const createBanner = useMutation({
        mutationFn: async (data) => await bannerServices.createBanner(data),
        onSuccess: () => {
            getAllBanner.refetch()
        }
    })
    const getAllBanner = useQuery({
        queryKey: ["getAllBanner", page],
        queryFn: async () => bannerServices.getAllBanner(page)
    })

    const updateBanner = useMutation({
        mutationFn: async (data) => await bannerServices.updateBanner(data),
        onSuccess: () => {
            getAllBanner.refetch()
        }
    })


    const deleteBanner = useMutation({
        mutationFn: async (id) => await bannerServices.deleteBanner(id),
        onSuccess: () => {
            getAllBanner.refetch()
        }
    })
    return {
        createBanner,
        getAllBanner,
        updateBanner,
        deleteBanner
    }
}

export default useBanner