import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { create } from "zustand";

interface State {
  cartItems: ProductsWithIngredients[];
  addCartItem: (product: ProductsWithIngredients) => void;
}

export const useCartItemsStore = create<State>((set) => ({
  cartItems: [],
  addCartItem: (product) =>
    set((state) => ({ cartItems: [...state.cartItems, product] })),
}));

