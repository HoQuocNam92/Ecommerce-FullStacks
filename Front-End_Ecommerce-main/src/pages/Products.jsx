import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useCategory from "@/hooks/useCategory";
import Spiner from "@/components/Spiner/Spiner";
import CategoriesSidebar from "@/components/Sidebar/CategoriesSidebar";
import ProductList from "@/components/Common/ProductList";
import ProductEmpty from "./ProductEmpty";
import useProduct from "@/hooks/useProduct";
import { PaginationDemo } from "@/components/Pagination/Pagination";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
const ProductsPage = () => {
    const { getCategories } = useCategory();
    const { id } = useParams() || 1;
    const { getProductSortByCategory, setCategoryId, pages, setPages } = useProduct();
    useEffect(() => {
        if (id) setCategoryId(id);
        setPages(1);
    }, [id]);



    if (getProductSortByCategory.isLoading || getCategories.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Spiner />
            </div>
        );
    }

    const products = getProductSortByCategory?.data || [];



    return (
        <div className="container">
            <div className="my-2">
                <Breadcrumb category_id={id} name_category={products.find(x => x.category_id === parseInt(id))?.name_category} />
            </div>
            <div >
                <div className=" mx-auto  flex gap-2">
                    <aside className="  sticky top-3 h-[100vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                        <CategoriesSidebar setCategoryId={setCategoryId} categories={getCategories?.data} />
                    </aside>

                    <main className="flex-1 ">
                        {products.length == 0 && (
                            <ProductEmpty />
                        )}

                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

                            {
                                products.map((product) => (
                                    <ProductList key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </main>
                </div>


            </div>
            <div className="my-2">
                <PaginationDemo totalPages={products[0]?.TotalPages} pages={pages} setPages={setPages} />
            </div>
        </div>
    );
};

export default ProductsPage;
