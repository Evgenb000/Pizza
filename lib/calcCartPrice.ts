import { CartItemDTO } from "@/services/dto/cart.dto";

export const calcCartPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  const price = (item.productItem.price + ingredientsPrice) * item.quantity;

  return price;
};
