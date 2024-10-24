import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { API_ROUTES } from "./constants";

export const getProducts = async (query?: string, amount?: number) => {
  return (
    await axiosInstance.get<Product[]>(API_ROUTES.SEARCH_PRODUCTS, {
      params: { query, amount },
    })
  ).data;
};
