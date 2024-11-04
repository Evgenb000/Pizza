import { useCartItemsStore } from "@/store/cartItems";
import { X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const CartSheetItems = () => {
  const { productItems, priceItems, ingredientItems, typeItems, sizeItems } =
    useCartItemsStore();
  const removeCartItem = useCartItemsStore((state) => state.removeCartItem);

  return productItems.length ? (
    <div className="divide-y divide-gray-200 flex-1 overflow-y-auto pr-2">
      {productItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 py-4"
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="text-[10px] text-gray-500">
            {typeItems[index] && typeItems[index] + "cm."}
            <br />
            {sizeItems[index] && sizeItems[index]}
          </span>
          <div className="flex-1">
            <div className="font-semibold text-base">{item.name}</div>
            <div className="text-[10px] text-gray-500 max-h-12 overflow-hidden">
              {ingredientItems[index]?.length > 0
                ? ingredientItems[index].join(", ")
                : ""}
            </div>
          </div>
          <div className="font-semibold text-lg text-gray-800">
            ${priceItems[index] + (ingredientItems[index]?.length || 0)}
          </div>

          <Button size={"icon"} onClick={() => removeCartItem(index)}>
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
