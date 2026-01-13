import React, { useState } from "react";
import {
  getCategory,
  // deleteCategory,
  // createCategory,
  getCategoryById
} from "@/services/CategoryServices";

import { CategoryContext } from "./CategoryContext";
import { useQuery } from "@tanstack/react-query";

export const CategoryProvider = ({ children }) => {
  const [categoryId, setCategoryId] = useState();

  const getCategories = useQuery({
    queryKey: ["category"],
    queryFn: getCategory
  })
  const getCategoryByid = useQuery({
    queryKey: ["getCategoryById", categoryId],
    queryFn: async () => await getCategoryById(categoryId),
    enabled: !!categoryId
  })


  return (
    <CategoryContext.Provider
      value={{
        getCategories,

        setCategoryId,
        getCategoryByid
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
