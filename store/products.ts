import { create } from "zustand";
import { Product } from "@prisma/client";
import { Api } from "@/services/api-client";

interface ProductsState {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await Api.products.products();
      set({ products: response });
    } catch (error) {
      console.error(error);
    }
  },
}));
