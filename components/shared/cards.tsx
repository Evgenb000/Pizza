"use client";

import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useIsScrolled } from "@/hooks/useScrollY";
import Image from "next/image";
import { categories } from "@/shared/constants";
import { useProducts } from "@/hooks/useProducts";
import { useGroupByCategory } from "@/hooks/useGroupByCaterogy";

interface Props {
  className?: string;
}

export const Cards: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const { products } = useProducts();
  const groupedProducts = useGroupByCategory(products);

  return (
    <div
      className={cn(
        isMobile ? "ml-10" : isScrolled ? "ml-72" : "ml-72",
        "grid gap-4 mt-16",
        className
      )}
    >
      {Object.keys(groupedProducts).map((categoryId) => (
        <div key={categoryId} id={categories[Number(categoryId)]}>
          <h3 className="text-xl font-bold mb-4">
            {categories[Number(categoryId)]}
          </h3>

          <div className="grid gap-4 grid-cols-3">
            {groupedProducts[Number(categoryId)].map((product) => (
              <Card key={product.id} className="h-72 scroll-target">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    {categories[Number(categoryId)]}
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
