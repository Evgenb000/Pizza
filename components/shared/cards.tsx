"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useProducts } from "@/hooks/use-products";
import { useGroupByCategory } from "@/hooks/use-group-by-caterogy";
import { Skeleton } from "../ui/skeleton";
import { Category } from "@prisma/client";
import { ProductCard } from "./card";

interface Props {
  className?: string;
  categories: Category[];
}

export const Cards: React.FC<Props> = ({ className, categories }) => {
  const { products } = useProducts();
  const groupedProducts = useGroupByCategory(products);

  return (
    <div className={cn("grid gap-4 w-full", className)}>
      {!Object.keys(groupedProducts).length
        ? Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton className="w-36 h-7 rounded-md mx-1 my-4" />

                <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
                  <Skeleton className="h-72 rounded-md mx-1" />
                  <Skeleton className="h-72 rounded-md mx-1" />
                  <Skeleton className="h-72 rounded-md mx-1" />
                  <Skeleton className="h-72 rounded-md mx-1" />
                  <Skeleton className="h-72 rounded-md mx-1" />
                  <Skeleton className="h-72 rounded-md mx-1" />
                </div>
              </div>
            ))
        : Object.keys(groupedProducts).map((categoryId, index) => (
            <ProductCard
              categoryName={categories[Number(categoryId) - 1].name}
              key={index}
              categoryId={categoryId}
            />
          ))}
    </div>
  );
};
