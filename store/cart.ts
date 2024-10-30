import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { create } from "zustand";

interface State {
  productItems: ProductsWithIngredients[];
  priceItems: number[];
  ingredientItems: string[][];
  typeItems: string[];
  sizeItems: string[];
  addCartItem: (
    product: ProductsWithIngredients,
    price: number,
    ingredients?: string[],
    type?: string,
    size?: string
  ) => void;
}

export const useCartItemsStore = create<State>((set) => ({
  productItems: [],
  priceItems: [],
  ingredientItems: [],
  typeItems: [],
  sizeItems: [],
  addCartItem: (
    product: ProductsWithIngredients,
    price: number,
    ingredients: string[] = [],
    type: string = "",
    size: string = ""
  ) =>
    set((state) => ({
      productItems: [...state.productItems, product],
      priceItems: [...state.priceItems, price],
      ingredientItems: [...state.ingredientItems, ingredients],
      typeItems: [...state.typeItems, type],
      sizeItems: [...state.sizeItems, size],
    })),
}));
