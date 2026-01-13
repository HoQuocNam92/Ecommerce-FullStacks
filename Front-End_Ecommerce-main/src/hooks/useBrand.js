import { useEffect, useState } from "react";
import {
  GetBrand,
  CreateBrand,
  DeleteBrand,
  UpdateBrand,
} from "@/services/BrandServices";
import { toast } from "sonner";
const useBrand = () => {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBranh = async () => {
    try {
      const response = await GetBrand();
      setBrand(response);
    } catch (err) {
      setError(err.message);
    }
  };
  const createBrand = async (brandData) => {
    setLoading(true);
    try {
      const response = await CreateBrand(brandData);
      setBrand((prev) => [...prev, response.brand]); // ✅ thêm vào state

      toast.success("Brand created successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to create brand");
    } finally {
      setLoading(false);
    }
  };
  const updateBrand = async (brandId, brandData) => {
    try {
      const response = await UpdateBrand(brandId, brandData);
      setBrand((prev) => prev.map((i) => (i.id === brandId ? response : i)));
      toast.success("Brand updated successfully");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to update brand");
    }
  };
  const deleteBrand = async (brandID) => {
    try {
      await DeleteBrand(brandID);
      setBrand((prev) => prev.filter((i) => i.id !== brandID));
      toast.success("Brand deleted successfully");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to delete brand");
    }
  };
  useEffect(() => {
    getBranh();
  }, []);
  return {
    brand,
    loading,
    error,
    getBranh,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};

export default useBrand;
