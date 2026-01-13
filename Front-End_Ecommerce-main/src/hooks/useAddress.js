import * as Address from '@/services/AddressServices'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
const useAddress = () => {
    const queryClient = useQueryClient();
    const account = useAuthStore((state) => state.user);
    const GetAddress = useQuery({
        queryKey: ["GetAddress", account?.id],
        queryFn: Address.GetAddress,
        enabled: !!account,
        refetchOnMount: 'always'

    })

    const Add_Address = useMutation({
        mutationFn: async (newAddress) => {
            return await Address.AddAddress(newAddress);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['GetAddress'])

        }
    })
    const UpdateAddress = useMutation({
        mutationFn: async (data) => {
            return await Address.UpdateAddress(data)
        },
        onSuccess: () => {

            GetAddress.refetch()
        }
    })
    const DeleteAddress = useMutation({
        mutationFn: async (data) => {
            return await Address.DeleteAddress(data)
        },
        onSuccess: () => {
            GetAddress.refetch()
        }
    })
    return {
        Add_Address,
        GetAddress,
        UpdateAddress,
        DeleteAddress
    }
}
export default useAddress;