"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsScrolled } from "@/hooks/use-scrollY";
import { useProductsStore } from "@/store/products";
import { categories } from "@/shared/constants";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const { products } = useProductsStore();

  const uniqueCategories = Array.from(
    new Set(products.map((product) => categories[product.categoryId]))
  );

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed top-24 transition-all translate-x-72 duration-300",
        isScrolled && "top-4",
        isMobile && "hidden",
        className
      )}
    >
      {uniqueCategories.length > 0 && (
        <Tabs defaultValue={uniqueCategories[4]} className="w-fit">
          <TabsList>
            {uniqueCategories.map((category, index) => (
              <TabsTrigger
                key={index}
                value={category}
                onClick={() => scrollToAnchor(category)}
                className=""
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};
