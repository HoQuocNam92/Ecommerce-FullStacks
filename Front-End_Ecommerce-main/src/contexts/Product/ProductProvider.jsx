import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  UpdateProduct,
  GetTopProduct,
  GetProductSortByCategory,
  GetProductRelated,
} from "@/services/ProductServices";
import { useEffect, useRef, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ProductProvider = ({ children }) => {
  const [pages, setPages] = useState(1);
  const productGridRef = useRef(null);
  const [sortBy, setSortBy] = useState('newest');
  const [totalPages, setTotalPages] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const queryClient = useQueryClient();


  const getProducts = useQuery({
    queryKey: ["products", pages],
    queryFn: async () => {
      const res = await GetProduct(pages);
      setTotalPages(res[0].TotalPages);
      return res;
    },
    refetchOnWindowFocus: false,
  });
  const getProductSortByCategory = useQuery({
    queryKey: ["products-sort-by-category", categoryId, pages, sortBy],
    queryFn: async () => {
      const res = await GetProductSortByCategory(categoryId, pages, sortBy);
      setTotalPages(res[0].TotalPages);
      return res;
    },
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });
  const getTopProduct = useQuery({
    queryKey: ["top-products"],
    queryFn: GetTopProduct,
    refetchOnWindowFocus: false,
  });



  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      getProducts.data = getProducts.data.filter(x => x.id !== id);
      return await DeleteProduct(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] })
      const prevData = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldData) => {
        oldData ? oldData.filter(x => x.id !== id) : []
      })
      return { prevData }
    },
    onError: (err, id, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["products"], context?.prevData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const createProduct = useMutation({
    mutationFn: async (formData) => {
      return await CreateProduct(formData);
    },
    onMutate: async (formData) => {
      const prevData = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldData) => {
        oldData ? [...oldData, { ...formData, id: Date.now() }] : [{ ...formData, id: Date.now() }]
      })
      return { prevData }
    },
    onError: (err, data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["products"], context?.prevData)

      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products-sort-by-category"])
      queryClient.invalidateQueries(["products"])
    }

  });

  const updateProduct = useMutation({
    mutationFn: async (data) => {
      return await UpdateProduct(data);

    },
    // onMutate: async ({ id, formData }) => {
    //   await queryClient.cancelQueries({ queryKey: ["products"] })
    //   const prevData = queryClient.getQueryData(["products"])
    //   queryClient.setQueryData(["products"], (oldData) => {
    //     if (!oldData) return;
    //     return oldData.map(x => x.id == id ? { ...x, ...formData } : x)
    //   })
    //   return { prevData }
    // },
    // onError: (err, data, context) => {
    //   if (context?.prevData) {
    //     queryClient.setQueryData(["products"], context?.prevData)

    //   }
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["products"] })
    // }

  });
  const loading = createProduct.isPending || updateProduct.isPending
  const products = getProducts || [];

  useEffect(() => {
    if (productGridRef.current) {

      window.scrollTo({ top: 0, behavior: "auto" });

    }
    getProducts.refetch();
  }, [pages]);

  return (
    <ProductContext.Provider
      value={{
        setPages,
        pages,
        loading,
        createProduct,
        updateProduct,
        products,
        getTopProduct,
        totalPages,
        deleteProduct,
        productGridRef,
        getProductSortByCategory,
        setCategoryId,
        sortBy,
        categoryId,
        setSortBy,


      }}
    >
      {children}
    </ProductContext.Provider>
  );
};


