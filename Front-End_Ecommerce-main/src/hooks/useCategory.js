

import { useContext } from "react";
import { CategoryContext } from "@/contexts/Category/CategoryContext";
const useCategory = () => useContext(CategoryContext);

export default useCategory;

