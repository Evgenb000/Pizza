import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";

type Price = number | null;
type Size = string;
type Type = string;

interface Props {
  className?: string;
  defaultValue: string;
  product: ProductsWithIngredients | null;
  setTotalPrice: React.Dispatch<React.SetStateAction<Price>>;
  setChosenSize: React.Dispatch<React.SetStateAction<Size>>;
  setChosenType: React.Dispatch<React.SetStateAction<Type>>;
}

export const CardModalTabs: React.FC<Props> = ({
  className,
  defaultValue,
  product,
  setTotalPrice,
  setChosenSize,
  setChosenType,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn("mt-4", className)}>
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
                    product?.items.find((item) => item.size === Number(size))
                      ?.pizzaType
                      ? product?.items.find(
                          (item) => item.size === Number(size)
                        )?.pizzaType === 1 && type === "Thin-Crust"
                      : false
                  }
                  onClick={() => {
                    setTotalPrice(
                      product?.items.find((item) => item.size === Number(size))
                        ?.price || 0
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
  );
};
