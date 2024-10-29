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
  const refClickAway = React.useRef(null);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useClickAway(refClickAway, () => {
    closeModal();
  });

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
            <Card className="flex flex-col justify-center items-center content-center">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{product?.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-center gap-2">
                <Image
                  src={product!.imageUrl}
                  alt={product!.name}
                  width={240}
                  height={240}
                />

                <div>
                  <CardDescription className="text-[12px]/[14px] md:block lg:block hidden  items-center">
                    {product!.ingredients.map((i) => i.name).join(", ")}
                  </CardDescription>
                  <Tabs defaultValue="20">
                    <TabsList>
                      {product?.items &&
                        product.items.map((i) => (
                          <TabsTrigger
                            key={i.id}
                            value={i.size ? String(i.size) : "20"}
                            className="text-[12px]/[14px] md:block lg:block hidden"
                          >
                            {i.size}
                          </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value={"20"}>
                      <Tabs defaultValue="Traditional">
                        <TabsList>
                          {product?.items &&
                            PizzaTypes.map((type) => (
                              <TabsTrigger value={type} key={type}>
                                {type}
                              </TabsTrigger>
                            ))}
                        </TabsList>
                      </Tabs>
                    </TabsContent>
                    <TabsContent value={"30"}>
                      <Tabs defaultValue="Traditional">
                        <TabsList>
                          {product?.items &&
                            PizzaTypes.map((type) => (
                              <TabsTrigger value={type} key={type}>
                                {type}
                              </TabsTrigger>
                            ))}
                        </TabsList>
                      </Tabs>
                    </TabsContent>
                    <TabsContent value={"40"}>
                      <Tabs defaultValue="Traditional">
                        <TabsList>
                          {product?.items &&
                            PizzaTypes.map((type) => (
                              <TabsTrigger value={type} key={type}>
                                {type}
                              </TabsTrigger>
                            ))}
                        </TabsList>
                      </Tabs>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="gap-8">
                <Button onClick={closeModal}>Close</Button>
                <Button onClick={closeModal}>Add to cart</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
