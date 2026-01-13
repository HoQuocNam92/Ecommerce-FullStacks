import { GetSearchProduct } from "@/services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import useDeBounce from "./useDebounce";
export default function useSearch(search) {


    const debouncedSearch = useDeBounce(search);
    const SearchProduct = useQuery({
        queryKey: ["SearchProduct", debouncedSearch],
        queryFn: async () => {
            const res = await GetSearchProduct(debouncedSearch)
            return res || [];
        },
        enabled: !!debouncedSearch?.trim(),
    })



    const error = SearchProduct?.error;
    const loading = SearchProduct?.isLoading
    const searchProduct = SearchProduct?.data || [];
    return { searchProduct, loading, error };
}



