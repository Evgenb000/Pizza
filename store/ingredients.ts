import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { create } from "zustand";

interface IngredientState {
  ingredients: Ingredient[];
  loading: boolean;
  hasFetched: boolean;
  fetchIngredients: () => Promise<void>;
}

export const useIngredientStore = create<IngredientState>()((set, get) => ({
  ingredients: [],
  loading: true,
  hasFetched: false,
  fetchIngredients: async () => {
    if (get().hasFetched) return;
    set({ loading: true, hasFetched: true });
    try {
      const ingredients = await Api.ingredients.getIngredients();
      set({ ingredients });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
