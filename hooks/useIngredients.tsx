import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
  ingredients: Ingredient[];
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getIngredients();
        setIngredients(ingredients);
      } catch (err) {
        console.log(err);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
