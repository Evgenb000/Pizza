import { create } from "zustand";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";

interface IngredientsState {
  ingredients: Ingredient[];
  fetchIngredients: () => Promise<void>;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
  ingredients: [],
  fetchIngredients: async () => {
    try {
      const response = await Api.ingredients.getIngredients();
      set({ ingredients: response });
    } catch (error) {
      console.error(error);
    }
  },
}));
