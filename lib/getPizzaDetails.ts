import { PizzaType, PizzaSize, mapPizzaType } from "@/shared/constants/pizza";
import { ProductItem, Ingredient } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calcCartPizzaPrice";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetaills };
};
