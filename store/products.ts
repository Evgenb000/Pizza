import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  loading: boolean;
  hasFetched: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>()((set, get) => ({
  products: [],
  loading: true,
  hasFetched: false,
  fetchProducts: async () => {
    if (get().hasFetched) return;
    set({ loading: true, hasFetched: true });
    try {
      const response = await Api.products.getProducts();
      set({ products: response });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
