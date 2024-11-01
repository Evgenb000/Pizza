import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  checkedIngredients?: string;
  minPrice?: string;
  maxPrice?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const ingredientsNames = params.checkedIngredients?.split(",");
  const ingredientsIdArr = ingredientsNames
    ? await prisma.ingredient
        .findMany({
          where: { name: { in: ingredientsNames } },
          select: { id: true },
        })
        .then((ingredients) => ingredients.map((ingredient) => ingredient.id))
    : undefined;

  const minPrice = Number(params.minPrice) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.maxPrice) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
