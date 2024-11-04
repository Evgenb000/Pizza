"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import { useCartItemsStore } from "@/store/cartItems";
import { CartSheetItems } from "./cartSheetItems";

interface Props {
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
  const { productItems } = useCartItemsStore();

  return (
    <section className={cn("", className)}>
      <h2>Cart</h2>
      <Separator orientation="horizontal" />
      <div>
        {productItems.length ? (
          <CartSheetItems />
        ) : (
          <div className="text-center mt-6 text-xl font-bold">
            Your cart is empty
          </div>
        )}
      </div>
    </section>
  );
};
