"use client";

import {
  Sheet,
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
import { useCartItemsStore } from "@/store/cartItems";
import { CartSheetItems } from "./cartSheetItems";
import { CartActions } from "./cartSheetAction";

interface CartSheetProps {
  side?: "right" | "top" | "bottom" | "left";
  iconSize?: number;
}

export function CartSheet({ side = "right", iconSize }: CartSheetProps) {
  const isScrolled = useIsScrolled();
  const { productItems, totalPrice } = useCartItemsStore();

  return (
    <Sheet key={side}>
      <SheetTrigger asChild className={cn(isScrolled && "bg-white")}>
        <div
          className={cn(
            "interactive",
            isScrolled &&
              "!z-50 !fixed flex justify-center items-center top-6 md:h-[42px] h-10 lg:w-32 md:w-20 w-10 lg:-translate-x-[30px] md:translate-x-[10px] translate-x-[10px] bgcolor border floatingBlocks cursor-pointer"
          )}
        >
          <div className="header-icon">
            <ShoppingCart
              size={iconSize}
              aria-label="Shopping cart"
              className="w-full"
            />
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side={side}
        className="overflow-y-auto h-full flex flex-col bg-white"
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {productItems.length > 0 && (
            <SheetDescription>
              Your items are waiting in the cart, ready to be ordered.
            </SheetDescription>
          )}
        </SheetHeader>

        <CartSheetItems />

        <SheetFooter className="mt-auto">
          <CartActions totalPrice={totalPrice} productItems={productItems} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
