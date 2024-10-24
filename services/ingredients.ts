import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { API_ROUTES } from "./constants";

export const getIngredients = async () => {
  return (
    await axiosInstance.get<Ingredient[]>(API_ROUTES.SEARCH_INGREDIENTS, {})
  ).data;
};
