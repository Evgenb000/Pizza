"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsScrolled } from "@/hooks/use-scroll-y";
import { Skeleton } from "../ui/skeleton";
import { categories } from "@/prisma/constants";
import { useCategoryStore } from "@/store/category";

interface Props {
  className?: string;
}

export const NavCategories: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const activeId = useCategoryStore((state) => state.activeId);
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
        "border rounded-md z-[2]",
        isScrolled && "floatingBlocks",
        isMobile && "hidden",
        className
      )}
    >
      {categories.length && (
        <Tabs
          defaultValue={"Pizzas"}
          value={categories?.[activeId - 1]?.name}
          className="w-fit"
        >
          <TabsList>
            {!categories.length
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-16 h-7 rounded-md mx-1"
                    />
                  ))
              : categories.map((category, index) => (
                  <div key={index} className="interactive">
                    <TabsTrigger
                      key={index}
                      value={category!.name}
                      onClick={() => scrollToAnchor(category!.name)}
                      className="flex"
                    >
                      {category!.name}
                    </TabsTrigger>
                  </div>
                ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};
