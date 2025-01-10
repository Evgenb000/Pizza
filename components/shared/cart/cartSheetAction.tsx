"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useCartItemsStore } from "@/store/cartItems";
import { cn } from "@/lib/utils";
import { SheetClose } from "../../ui/sheet";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { useCartStore } from "@/store/cart";
import React from "react";

interface CartActionsProps {
  totalPrice: number;
  productItems: ProductsWithIngredients[];
}

export function CartActions({ totalPrice, productItems }: CartActionsProps) {
  const { fetchCartItems } = useCartStore();

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <>
      {productItems.length ? (
        <>
          <Link href={"/checkout"} className="w-full h-full">
            <Button type="submit" className="w-full">
              Order - $ {totalPrice}
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Clear
            </AlertDialogTrigger>
            <AlertDialogContent className="w-68">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
  );
}
