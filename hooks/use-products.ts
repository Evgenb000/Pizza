import { useMemo } from "react";
import { useProductsStore } from "@/store/products";

export const useProducts = () => {
  const { products, fetchProducts, loading } = useProductsStore();

  const data = useMemo(() => {
    fetchProducts();
    return {
      products,
      loading,
    };
  }, [fetchProducts, loading, products]);

  return data;
};
