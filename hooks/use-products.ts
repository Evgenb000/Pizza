import { useEffect } from "react";
import { useProductsStore } from "@/store/products";

export const useProducts = () => {
  const { products, fetchProducts, loading } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
  };
};
