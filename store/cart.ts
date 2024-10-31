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
  removeCartItem: (index: number) => void;
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

  removeCartItem: (index: number) =>
    set((state) => ({
      productItems: state.productItems.filter((_, i) => i !== index),
      priceItems: state.priceItems.filter((_, i) => i !== index),
      ingredientItems: state.ingredientItems.filter((_, i) => i !== index),
      typeItems: state.typeItems.filter((_, i) => i !== index),
      sizeItems: state.sizeItems.filter((_, i) => i !== index),
    })),
}));
