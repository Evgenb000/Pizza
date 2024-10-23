"use client";

import { useIsMobile } from "@/hooks/use-mobile";
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
import { useIsScrolled } from "@/hooks/use-scrollY";
import { useProductsStore } from "@/store/products";
import Image from "next/image";
import { categories } from "@/shared/constants";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
}

const groupByCategory = (products: Product[]) => {
  return products.reduce<Record<number, Product[]>>(
    (grouped, product) => {
      const category = product.categoryId;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
      return grouped;
    },
    {} as Record<number, Product[]>
  );
};

export const Cards: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const { products, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const groupedProducts = groupByCategory(products);

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
