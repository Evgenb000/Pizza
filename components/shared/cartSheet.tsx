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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CartSheetItems } from "./cartSheetItems";

interface CartSheetProps {
  side?: "right" | "top" | "bottom" | "left";
  iconSize?: number;
}

export function CartSheet({ side = "right", iconSize }: CartSheetProps) {
  const isScrolled = useIsScrolled();
  const { productItems, priceItems, ingredientItems } = useCartItemsStore();

  return (
    <Sheet key={side}>
      <SheetTrigger asChild className={cn(isScrolled && "bg-white")}>
        <div
          className={cn(
            "interactive",
            isScrolled &&
              "!z-50 !fixed flex justify-center items-center top-6 md:h-[42px] h-10 lg:w-32 md:w-20 w-10 lg:-translate-x-[45px] md:translate-x-[10px] translate-x-[10px] bgcolor border floatingBlocks cursor-pointer"
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
          <>
            {productItems.length ? (
              <>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Order - $
                    {productItems.reduce((acc, _, index) => {
                      const basePrice = priceItems[index];
                      const ingredientCount =
                        ingredientItems[index]?.length || 0;
                      return acc + basePrice + ingredientCount;
                    }, 0)}
                  </Button>
                </SheetClose>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full">
                    <Button type="button" className="w-full">
                      Clear
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-68">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will clear your cart.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-ring">
                        Cancel
                      </AlertDialogCancel>
                      <SheetClose asChild>
                        <AlertDialogAction
                          onClick={() => {
                            useCartItemsStore.setState({
                              productItems: [],
                              priceItems: [],
                              ingredientItems: [],
                              typeItems: [],
                              sizeItems: [],
                            });
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </SheetClose>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : null}
          </>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
