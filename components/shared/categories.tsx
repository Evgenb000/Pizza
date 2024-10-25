"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useIsMobile } from "@/hooks/useMobile";
import { useIsScrolled } from "@/hooks/useScrollY";
import { Skeleton } from "../ui/skeleton";
import { categories } from "@/prisma/constants";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.name))
  ).map((name) => categories.find((category) => category.name === name));

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
      {uniqueCategories.length && (
        <Tabs defaultValue={"Pizzas"} className="w-fit">
          <TabsList>
            {!uniqueCategories.length
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-16 h-7 rounded-md mx-1"
                    />
                  ))
              : uniqueCategories.map((category, index) => (
                  <TabsTrigger
                    key={index}
                    value={category!.name}
                    onClick={() => scrollToAnchor(category!.name)}
                    className=""
                  >
                    {category!.name}
                  </TabsTrigger>
                ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};
