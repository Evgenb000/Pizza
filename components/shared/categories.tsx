"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useIsMobile } from "@/hooks/useMobile";
import { useIsScrolled } from "@/hooks/useScrollY";
import { categories } from "@/shared/constants";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const { products } = useProducts();

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
        "fixed top-20 transition-all translate-x-72 duration-300 border rounded-md",
        isScrolled && "floatingBlocks",
        isMobile && "hidden",
        className
      )}
    >
      <Tabs defaultValue={uniqueCategories[4]} className="w-fit">
        <TabsList>
          {!uniqueCategories.length
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="w-16 h-7 rounded-md mx-1" />
                ))
            : uniqueCategories.map((category, index) => (
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
    </div>
  );
};
