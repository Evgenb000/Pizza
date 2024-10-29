import { Prisma } from "@prisma/client";

export type ProductsWithIngredients = Prisma.ProductGetPayload<{
  include: {
    ingredients: true;
    items: true;
  };
}>;
