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
  import { useCartItemsStore } from "@/store/cart";
  import { useIngredients } from "@/hooks/use-ingredients";

  interface Props {
    className?: string;
    product: ProductsWithIngredients | null;
    isOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
  }

  const pizzaTypes = ["Traditional", "Thin-Crust"];

  export const CardModal: React.FC<Props> = ({
    className,
    product,
    isOpen,
    setIsModalOpen,
  }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const handleClose = () => {
      setIsModalOpen(false);
      document.body.style.overflow = "unset";
    };
    const [totalPrice, setTotalPrice] = React.useState<number | null>(null);
    const [choosenIngredient, setChosenIngredient] = React.useState<string[]>([]);
    const [choosenSize, setChosenSize] = React.useState<string>('20');
    const [choosenType, setChosenType] = React.useState<string>('Traditional');
    const { addCartItem } = useCartItemsStore();
    const { ingredients } = useIngredients();

    useClickAway(ref, handleClose);

    const handleChooseIngredient = (ingredient: string) => {
      if (choosenIngredient.includes(ingredient)) {
        setChosenIngredient(choosenIngredient.filter((i) => i !== ingredient));
      } else {
        setChosenIngredient([...choosenIngredient, ingredient]);
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
              <Card className="flex flex-col justify-center items-center w-[600px] h-[400px]">
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

                  <div className="overflow-y-auto h-[240px]">
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
                            onClick={() => {setTotalPrice(item.price), setChosenSize(String(item.size))}}
                          >
                            {item.size}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {["20", "30", "40"].map((size) => (
                        <TabsContent key={size} value={size}>
                          <Tabs defaultValue="Traditional">
                            <TabsList className="w-full border shadow-md">
                              {pizzaTypes.map((type) => (
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
                                  onClick={() =>{
                                    setTotalPrice(
                                      product?.items.find(
                                        (item) => item.size === Number(size)
                                      )?.price || 0
                                    ), setChosenType(type)}
                                  }
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
                          key={ingredient.id}
                          className={cn(
                            "p-1 border rounded-md shadow-md",
                            choosenIngredient.includes(ingredient.name)
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
                      product &&
                        totalPrice &&
                        addCartItem(product, totalPrice, choosenIngredient, choosenSize, choosenType);
                      setChosenIngredient([]);
                    }}
                  >
                    Add to cart for ${totalPrice || 0}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
