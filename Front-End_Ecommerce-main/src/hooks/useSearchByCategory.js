import { useQuery } from "@tanstack/react-query";
import { getProductSearchByCategory } from "@/services/ProductServices";

export default function useSearchByCategory({
    keyword,
    categoryId,
    page,
    sortBy
}) {
    const productsQuery = useQuery({
        queryKey: ["products", keyword, categoryId, page, sortBy],
        queryFn: () =>
            getProductSearchByCategory({
                keyword,
                categoryId,
                page,
                sortBy
            }),

        keepPreviousData: true,
    });

    return { productsQuery };
}
