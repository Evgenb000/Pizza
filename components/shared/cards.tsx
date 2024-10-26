"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { useProducts } from "@/hooks/use-products";
import { useGroupByCategory } from "@/hooks/use-group-by-caterogy";
import { Skeleton } from "../ui/skeleton";
import { categories } from "@/prisma/constants";

interface Props {
  className?: string;
}

export const Cards: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const { products } = useProducts();
  const groupedProducts = useGroupByCategory(products);

  return (
    <div className={cn("grid gap-4 w-full", isMobile && "ml-10", className)}>
      {!Object.keys(groupedProducts).length
        ? Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton className="w-36 h-7 rounded-md mx-1 my-4" />

                <div className="grid gap-4 grid-cols-3">
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
            <div key={index} id={categories[Number(categoryId) - 1].name}>
              <h3 className="text-xl font-bold mb-4">
                {categories[Number(categoryId) - 1].name}
              </h3>

              <div className="grid gap-4 grid-cols-3">
                {groupedProducts[Number(categoryId)].map((product) => (
                  <Card key={product.id} className="h-72 scroll-target">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>
                        {categories[Number(categoryId) - 1].name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={60}
                        height={60}
                      />
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};
