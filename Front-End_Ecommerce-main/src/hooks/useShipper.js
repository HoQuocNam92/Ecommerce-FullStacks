import { useQuery } from '@tanstack/react-query'
import * as shipper from '@/services/ShipperServices'
const useShipper = () => {

    const getShipper = useQuery({
        queryKey: ['shipper'],
        queryFn: async () => {
            const res = await shipper.getAllShippingMethod()
            return res.data.data
        }
    })
    return {
        isLoading: getShipper.isLoading,
        error: getShipper.error,
        shipper: getShipper.data
    }
}

export default useShipper;