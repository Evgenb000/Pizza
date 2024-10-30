"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useIsScrolled } from "@/hooks/use-scroll-y";
import { cn } from "@/lib/utils";
import { useCartItemsStore } from "@/store/cart";
import Image from "next/image";

interface CartSheetProps {
  side?: "right" | "top" | "bottom" | "left";
  iconSize?: number;
}

export function CartSheet({ side = "right", iconSize }: CartSheetProps) {
  const isScrolled = useIsScrolled();
  const { productItems, priceItems, ingredientItems, typeItems, sizeItems } =
    useCartItemsStore();

  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <div
          className={cn(
            isScrolled &&
              "flex justify-center items-center top-6 md:h-[42px] h-10 lg:w-32 md:w-20 w-10 fixed lg:-translate-x-[38px] md:translate-x-[10px] translate-x-[10px] bgcolor border floatingBlocks cursor-pointer"
          )}
        >
          <ShoppingCart
            className="interactive"
            size={iconSize}
            aria-label="Shopping cart"
          />
        </div>
      </SheetTrigger>

      <SheetContent side={side} className="overflow-y-auto h-full">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Your items are waiting in the cart, ready to be ordered.
          </SheetDescription>
        </SheetHeader>

        <div className="divide-y divide-gray-200">
          {productItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
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
            </div>
          ))}
        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Order - $
              {productItems.reduce((acc, _, index) => {
                const basePrice = priceItems[index];
                const ingredientCount = ingredientItems[index]?.length || 0;
                return acc + basePrice + ingredientCount;
              }, 0)}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
