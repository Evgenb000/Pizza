/* eslint-disable @typescript-eslint/no-unused-expressions */
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

interface Props {
  className?: string;
  product: ProductsWithIngredients | null;
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const PizzaTypes = ["Traditional", "Thin-Crust"];

export const CardModal: React.FC<Props> = ({
  className,
  product,
  isOpen,
  setIsModalOpen,
}) => {
  const refClickAway = React.useRef<HTMLDivElement | null>(null);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useClickAway(refClickAway, handleCloseModal);

  console.log(product);

  return (
    <div className={cn("", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refClickAway}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-30"
            style={{ width: "min(90vw, 600px)" }}
          >
            <Card className="flex flex-col justify-center items-center">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{product?.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-center gap-2">
                <Image
                  src={product?.imageUrl || ""}
                  alt={product?.name || ""}
                  width={240}
                  height={240}
                />

                <div>
                  <CardDescription className="text-[12px]/[14px] md:block lg:block hidden items-center">
                    {product?.ingredients
                      .map((ingredient) => ingredient.name)
                      .join(", ")}
                  </CardDescription>

                  <Tabs defaultValue="20" className="mt-4">
                    <TabsList className="w-full border shadow-md">
                      {product?.items?.map((item) => (
                        <TabsTrigger
                          key={item.id}
                          value={item.size ? String(item.size) : "20"}
                          className="text-[12px]/[14px] md:block lg:block hidden w-full h-full"
                        >
                          {item.size}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {["20", "30", "40"].map((size, index) => (
                      <TabsContent key={size} value={size}>
                        <Tabs defaultValue="Traditional">
                          <TabsList className="w-full border shadow-md">
                            {PizzaTypes.map((type) => (
                              <TabsTrigger
                                key={type}
                                value={type}
                                className="w-full h-full"
                                disabled={
                                  product?.items[index]?.pizzaType
                                    ? product?.items[index]?.pizzaType === 1 &&
                                      type === "Thin-Crust"
                                    : false
                                }
                              >
                                {type}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          <TabsContent value="Traditional" className="w-full">
                            <Button className="w-full">
                              Add to cart for ${product?.items[index]?.price}
                            </Button>
                          </TabsContent>
                          <TabsContent value="Thin-Crust">
                            <Button className="w-full">
                              Add to cart for ${product!.items[index]?.price}
                            </Button>
                          </TabsContent>
                        </Tabs>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </CardContent>
              {/* <CardFooter className="gap-8"></CardFooter> */}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
