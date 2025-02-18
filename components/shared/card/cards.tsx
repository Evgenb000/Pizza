"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "../../ui/skeleton";
import { CardItem } from "./cardItem";
import { useGroupByCategory } from "@/hooks/use-group-by-caterogy";
import { CategoryWithProducts } from "@/types/categoryWithProducts";

interface Props {
  className?: string;
  categories: CategoryWithProducts[];
}

export const Cards: React.FC<Props> = ({ className, categories }) => {
  const { products } = useProducts();
  const groupedProductsByCategoryId = useGroupByCategory(products);

  return (
    <div className={cn("grid gap-4 w-full", className)}>
      {!Object.keys(groupedProductsByCategoryId).length
        ? Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton className="w-36 h-7 rounded-md mx-1 my-4" />
                <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-72 rounded-md mx-1" />
                    ))}
                </div>
              </div>
            ))
        : Object.keys(groupedProductsByCategoryId).map((categoryId, index) => (
            <CardItem
              allCategories={categories[Number(categoryId) - 1]}
              categoryName={categories[Number(categoryId) - 1].name}
              categoryId={categoryId}
              key={index}
            />
          ))}
    </div>
  );
};
