import { Button } from "@/components/ui";
import useCategory from "@/hooks/useCategory";
import useSearchByCategory from "@/hooks/useSearchByCategory";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsFilters from "./ProductsFilters";
import ProductsTable from "./ProductTable";
import { PaginationDemo } from "@/components/Pagination/Pagination";
import { Spinner } from "@/components/ui/spinner";
import useProduct from "@/hooks/useProduct";

const Products = () => {
    const navigate = useNavigate();
    const { getCategories } = useCategory();

    const { deleteProduct } = useProduct();
    const [page, setPage] = useState(1);

    const [inputSearch, setInputSearch] = useState("");
    const [keyword, setKeyword] = useState("");

    const [categoryId, setCategoryId] = useState(1);
    const [sortBy, setSortBy] = useState("newest");

    const { productsQuery } = useSearchByCategory({
        keyword,
        categoryId,
        page,
        sortBy
    });

    const onSearch = () => {
        setKeyword(inputSearch);
        setPage(1);
    };
    if (productsQuery.isLoading || getCategories.isLoading) {
        return <Spinner />;
    }

    return (
        <div className="p-4 bg-white space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
                    <p className="text-gray-600">Quản lý tất cả sản phẩm</p>
                </div>

                <Button onClick={() => navigate("create")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm sản phẩm
                </Button>
            </div>

            <ProductsFilters
                inputSearch={inputSearch}
                setInputSearch={setInputSearch}
                onSearch={onSearch}
                sort={sortBy}
                setSort={setSortBy}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                categories={getCategories.data}
            />

            <ProductsTable deleteProduct={deleteProduct} products={productsQuery.data?.items} />

            <PaginationDemo
                pages={page}
                setPages={setPage}
                totalPages={productsQuery?.data?.totalPages}
            />
        </div>
    );
};
export default Products;