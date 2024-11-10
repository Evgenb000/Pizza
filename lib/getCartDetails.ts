import { CartDTO } from "../services/dto/cart.dto";
import { calcCartPrice } from "./calcCartPrice";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO | CartDTO[]): ReturnProps => {
  const cartData = Array.isArray(data) ? data[0] : data;

  const items =
    cartData.items?.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcCartPrice(item),
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      disabled: false,
      ingredients:
        item.ingredients?.map((ingredient) => ({
          name: ingredient.name,
          price: ingredient.price,
        })) || [],
    })) || [];

  return {
    items,
    totalAmount: cartData.totalAmount || 0,
  };
};
