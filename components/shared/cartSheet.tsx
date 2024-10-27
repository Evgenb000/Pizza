"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "../ui/label";
import { ShoppingCart } from "lucide-react";
import { useIsScrolled } from "@/hooks/us-scroll-y";
import { cn } from "@/lib/utils";
// import Image from "next/image";

interface CartSheetProps {
  side?: "right" | "top" | "bottom" | "left";
  iconSize?: number;
}

export function CartSheet({ side = "right", iconSize }: CartSheetProps) {
  const isScrolled = useIsScrolled();

  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <div
          className={cn(
            isScrolled &&
              "flex justify-center content-center items-center top-6 md:h-[42px] h-10 lg:w-32 md:w-20 w-10 fixed  lg:-translate-x-[38px] md:translate-x-[10px] translate-x-[10px] bgcolor border floatingBlocks"
          )}
        >
          <ShoppingCart
            className={cn("interactive")}
            size={iconSize}
            aria-label="Shopping cart"
          ></ShoppingCart>
        </div>
      </SheetTrigger>

      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            Your items are waiting in the cart, ready to be ordered.
          </SheetDescription>
        </SheetHeader>

        <div className="flex content-center items-center gap-2 mt-4">
          {/* <Image src="images/" alt="" width={16} height={16} /> */}
          <Label htmlFor="amount" className="text-right h-full ">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="1"
            className="col-span-3"
          />
          <span>
            <b>Price$</b>
          </span>
        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="submit">Order</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
