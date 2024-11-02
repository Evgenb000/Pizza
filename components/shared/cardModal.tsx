import { cn } from "@/lib/utils";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useClickAway } from "react-use";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useCartItemsStore } from "@/store/cart";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useIngredientStore } from "@/store/ingredients";

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
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { unlockScroll } = useLockScroll();
  const handleClose = () => {
    setIsModalOpen(false);
    setChosenIngredients([]);
    unlockScroll();
  };
  const [totalPrice, setTotalPrice] = React.useState<number | null>(null);
  const [chosenIngredients, setChosenIngredients] = React.useState<string[]>(
    []
  );
  const [chosenSize, setChosenSize] = React.useState<string>("20");
  const [chosenType, setChosenType] = React.useState<string>("Traditional");
  const { addCartItem } = useCartItemsStore();
  const { ingredients, loading, fetchIngredients } = useIngredientStore();

  React.useEffect(() => {
    if (!loading) return;
    fetchIngredients();
  }, [loading, fetchIngredients]);

  useClickAway(ref, handleClose);

  const handleChooseIngredient = (ingredient: string) => {
    if (chosenIngredients.includes(ingredient)) {
      setChosenIngredients(chosenIngredients.filter((i) => i !== ingredient));
    } else {
      setChosenIngredients([...chosenIngredients, ingredient]);
    }
  };

  React.useEffect(() => {
    if (product) {
      setTotalPrice(product.items[0].price);
    }
  }, [product]);

  return (
    <div className={cn("", className)}>
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
                  <Tabs
                    defaultValue={
                      product?.items[0].size
                        ? String(product.items[0].size)
                        : "20"
                    }
                    className="mt-4"
                  >
                    <TabsList className="w-full border shadow-md">
                      {product?.items.map((item) => (
                        <TabsTrigger
                          key={item.id}
                          value={item.size ? String(item.size) : "20"}
                          className="text-[12px]/[14px] md:block lg:block hidden w-full h-full"
                          onClick={() => {
                            setTotalPrice(item.price);
                            setChosenSize(String(item.size));
                          }}
                        >
                          {item.size}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {["20", "30", "40"].map((size) => (
                      <TabsContent key={size} value={size}>
                        <Tabs defaultValue="Traditional">
                          <TabsList className="w-full border shadow-md">
                            {["Traditional", "Thin-Crust"].map((type) => (
                              <TabsTrigger
                                key={type}
                                value={type}
                                className="w-full h-full"
                                disabled={
                                  product?.items.find(
                                    (item) => item.size === Number(size)
                                  )?.pizzaType
                                    ? product?.items.find(
                                        (item) => item.size === Number(size)
                                      )?.pizzaType === 1 &&
                                      type === "Thin-Crust"
                                    : false
                                }
                                onClick={() => {
                                  setTotalPrice(
                                    product?.items.find(
                                      (item) => item.size === Number(size)
                                    )?.price || 0
                                  );
                                  setChosenType(type);
                                }}
                              >
                                {type}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </TabsContent>
                    ))}
                  </Tabs>
                  <div className="mt-2 text-sm">For $1:</div>
                  <div className="grid grid-cols-4 justify-center items-center content-center gap-2">
                    {ingredients.map((ingredient) => (
                      <div
                        key={ingredient.name}
                        className={cn(
                          "p-1 border rounded-md shadow-md",
                          chosenIngredients.includes(ingredient.name)
                            ? "bg-gray-200"
                            : ""
                        )}
                        onClick={() => handleChooseIngredient(ingredient.name)}
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
                      addCartItem(
                        product,
                        totalPrice,
                        chosenIngredients,
                        chosenSize,
                        chosenType
                      );
                    }
                    setChosenIngredients([]);
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
