"use client";

import { cn } from "@/lib/utils";
import { useCartItemsStore } from "@/store/cartItems";
import React from "react";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface Props {
  className?: string;
}

export const CheckoutPayment: React.FC<Props> = ({ className }) => {
  const [valueOTP, setValueOTP] = React.useState("");
  const { totalPrice } = useCartItemsStore();

  const tax = 0.2;
  const discount = valueOTP === "1111" ? 2 : 0;
  const delivery = totalPrice ? 2 : 0;

  const grandTotal = totalPrice + totalPrice * tax - discount + delivery;

  return (
    <div className={cn("h-fit w-fit text-neutral-500", className)}>
      <h2 className="text-black">Payment Summary</h2>
      <h3 className="text-black text-xl mt-2">
        Total price: ${grandTotal.toFixed(2)}
      </h3>
      <ul className="flex flex-col mt-2">
        {[
          { name: "Cart Total", price: totalPrice },
          { name: "Tax", price: totalPrice * tax },
          { name: "Delivery", price: delivery },
          { name: "Discount", price: discount },
        ].map(({ name, price }) => (
          <li className="flex justify-between items-center" key={name}>
            <span>{name}</span>
            <span className="flex-1 border-b border-gray-300 mx-2"></span>
            <span className="font-bold">
              {name === "Discount" && discount !== 0
                ? "-$" + price.toFixed(2)
                : "$" + price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          className="mt-2"
          value={valueOTP}
          onChange={(valueOTP) => setValueOTP(valueOTP)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm">I have a promo code</div>
        <div className="text-sm text-green-500">try 1111</div>
      </div>
      <Button className="w-full mt-6">Proceed to Pay</Button>
    </div>
  );
};
