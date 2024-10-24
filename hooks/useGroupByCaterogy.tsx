import { Product } from "@prisma/client";

export const useGroupByCategory = (products: Product[]) => {
  return products.reduce<Record<number, Product[]>>(
    (grouped, product) => {
      const category = product.categoryId;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
      return grouped;
    },
    {} as Record<number, Product[]>
  );
};
