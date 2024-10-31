import { useEffect } from "react";
import { useIngredientStore } from "@/store/ingredients";

export const useIngredients = () => {
  const { ingredients, loading, fetchIngredients } = useIngredientStore();

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return {
    ingredients,
    loading,
  };
};
