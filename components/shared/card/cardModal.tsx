import { cn } from "@/lib/utils";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { SquareCheck } from "lucide-react";
import { CardModalTabs } from "./cardModalTabs";
import { useCardModal } from "@/hooks/use-card-modal";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useCartStore } from "@/store/cart";

interface Props {
  className?: string;
  product: ProductsWithIngredients | null;
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const CardModal: React.FC<Props> = ({
  className,
  product,
  isOpen,
  setIsModalOpen,
}) => {
  const {
    ref,
    totalPrice,
    chosenIngredients,
    ingredients,
    chosenSize,
    chosenType,
    toast,
    handleChooseIngredient,
    setChosenIngredients,
    setTotalPrice,
    setChosenSize,
    setChosenType,
  } = useCardModal({ product, setIsModalOpen });
  const addCartItem = useCartStore((state) => state.addCartItem);

  return (
    <div className={cn("", className)}>
      <Toaster />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-30"
            style={{ width: "min(90vw, 600px)" }}
          >
            <Card className="flex flex-col justify-center items-center w-[600px] h-[500px]">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{product?.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex gap-2">
                <Image
                  src={product?.imageUrl || ""}
                  alt={product?.name || ""}
                  width={240}
                  height={240}
                  className="w-[240px] h-[240px] object-cover"
                />

                <div className="overflow-y-auto h-[320px] bg-white/50 rounded-md p-2">
                  <CardDescription className="text-[12px]/[14px] md:block lg:block hidden items-center">
                    {product?.ingredients
                      .map((ingredient) => ingredient.name)
                      .join(", ")}
                  </CardDescription>

                  <CardModalTabs
                    defaultValue={
                      product?.items[0].size
                        ? String(product.items[0].size)
                        : "20"
                    }
                    product={product}
                    setTotalPrice={setTotalPrice}
                    setChosenSize={setChosenSize}
                    setChosenType={setChosenType}
                  />

                  <div className="mt-2 text-sm">For $1:</div>
                  <div className="grid grid-cols-4 justify-center items-center content-center gap-2">
                    {ingredients.map((ingredient) => (
                      <div
                        key={ingredient.name}
                        className={cn(
                          "p-1 border rounded-md shadow-md",
                          chosenIngredients.includes(ingredient.id)
                            ? "bg-gray-200"
                            : ""
                        )}
                        onClick={() => handleChooseIngredient(ingredient.id)}
                      >
                        <Image
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          className="w-full h-full object-cover"
                          width={60}
                          height={60}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-8">
                <Button
                  className="w-full"
                  onClick={() => {
                    if (product && totalPrice) {
                      addCartItem({
                        productItemId: product.items[0].id,
                        ingredients: chosenIngredients,
                        pizzaType: chosenType === "Traditional" ? 0 : 1,
                        pizzaSize: Number(chosenSize),
                      });
                    }
                    setChosenIngredients([]);
                    toast({
                      title: "Success!",
                      description: "Product added to cart",
                      action: (
                        <SquareCheck className="text-center text-green-500" />
                      ),
                    });
                  }}
                >
                  Add to cart for $
                  {(totalPrice && totalPrice + chosenIngredients.length) || 0}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
