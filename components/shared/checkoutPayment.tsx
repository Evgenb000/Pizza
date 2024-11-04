"use client";

import { cn } from "@/lib/utils";
import { useCartItemsStore } from "@/store/cartItems";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export const CheckoutPayment: React.FC<Props> = ({ className }) => {
  const { totalPrice } = useCartItemsStore();

  const tax = 0.2;
  const discount = 0;
  const delivery = totalPrice ? 2 : 0;

  const grandTotal =
    totalPrice + totalPrice * tax - totalPrice * discount + delivery;

  return (
    <div className={cn("h-fit w-48 text-neutral-500", className)}>
      <h2 className="text-black">Payment Summary</h2>
      <h3 className="text-black text-xl mt-2">
        Total price: ${grandTotal.toFixed(2)}
      </h3>
      <ul className="flex flex-col mt-2">
        {[
          { name: "Cart Total", price: totalPrice },
          { name: "Tax", price: totalPrice * tax },
          { name: "Delivery", price: delivery },
          { name: "Discount", price: -totalPrice * discount },
        ].map(({ name, price }) => (
          <li className="flex justify-between items-center" key={name}>
            <span>{name}</span>
            <span className="flex-1 border-b border-gray-300 mx-2"></span>
            <span className="font-bold">${price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-6">Proceed to Pay</Button>
    </div>
  );
};
