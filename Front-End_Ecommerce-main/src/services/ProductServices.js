import instance from "@/utils/axiosInstance";

export const GetProduct = async (page = 1) => {
  const res = await instance.get(`/products?page=${page}`);

  return res.data.data;
};
export const GetTopProduct = async () => {
  const res = await instance.get(`/products/top-products`);
  return res.data.data;
};
export const GetProductSortByCategory = async (categoryId, page = 1, sortBy = 'newest') => {
  const res = await instance.get(`/products/sortedByCategory?category_id=${categoryId}&page=${page}&sortBy=${sortBy}`);
  return res.data.data;
}
export const getProductSearchByCategory = async ({
  keyword,
  categoryId,
  page,
  sortBy
}) => {
  const res = await instance.get(
    `/products/search-product-category`,
    {
      params: {
        keyword,
        categoryId,
        page,
        sortBy
      }
    }
  );
  return res.data.data;
};

export const GetSortedProducts = async (page = 1, sort) => {
  const res = await instance.get(`/products/search/sorted?sortBy=${sort}&page=${page}`);
  return res.data.data;
}
export const GetProductRelated = async (id, category_id) => {
  const res = await instance.get(`/products/related/${id}/${category_id}`);
  return res.data.data
}
export const GetProductDetails = async (slug) => {
  const res = await instance.get(`/products/${slug}`);
  return res.data.data;
};

export const CreateProduct = async (productData) => {
  const res = await instance.post("/dashboard/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};
export const UpdateProduct = async (data) => {
  const res = await instance.put(`/dashboard/products`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const DeleteProduct = async (id) => {
  const res = await instance.delete(`/dashboard/products/${id}`);
  return res.data;
};


export const GetTopSelling = async () => {
  const res = await instance.get(`/analytics/overview`);
  // expect res.data.topProducts
  return res.data?.topProducts || [];
};

export const GetTopProducts = async (params = {}) => {
  const res = await instance.get(`/analytics/top-products`, { params });
  return res.data;
};

export const GetSaleProducts = async () => {
  const res = await instance.get(`/products/sales`);
  return res.data;
};

export const SetProductSale = async (id, payload) => {
  const res = await instance.put(`/products/${id}/sale`, payload);
  return res.data;
};

export const GetSearchProduct = async (search) => {
  const res = await instance.get(`/products/search?keyword=${encodeURIComponent(search)}`);
  return res.data.data;
};

