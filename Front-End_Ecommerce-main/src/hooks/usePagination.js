import { GetProduct } from "@/services/ProductServices";
import { useState } from "react";
const usePagination = () => {
    const [pages, setPages] = useState(1);
    setPages((prev) => prev + 1);
    async () => {
        await GetProduct(pages);
    }
}
export default usePagination;