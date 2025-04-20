import { X } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { mapPizzaType } from "@/shared/constants/pizza";

export const CartSheetItems = () => {
  const { items, loading } = useCartStore();
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  console.log(items);

  return items.length ? (
    <div className="divide-y divide-gray-200 flex-1 overflow-y-auto pr-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 py-4">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="text-[10px] text-gray-500">
            {item.pizzaType && mapPizzaType[item.pizzaType as 1 | 2]}

            <br />

            {item.pizzaSize && items[index].pizzaSize + " cm."}
          </span>
          <div className="flex-1">
            <div className="font-semibold text-base">{item.name}</div>
            <div className="text-[10px] text-gray-500 max-h-12 overflow-hidden">
              {item.ingredients?.length > 0 ? item.ingredients.join(", ") : ""}
            </div>
          </div>
          <div className="font-semibold text-lg text-gray-800">
            x{item.quantity} = ${item.price + item.ingredients?.length * 1}
          </div>
          <Button size={"icon"} onClick={() => removeCartItem(item.id)}>
            <X />
          </Button>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-500 mt-40 flex-1">
      There is nothing here! <br /> You may choose what you want)
    </div>
  );
};
