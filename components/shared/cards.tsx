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

interface Props {
  className?: string;
}

export const Cards: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();
  const { products, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div
      className={cn(
        isMobile ? "ml-10" : isScrolled ? "ml-72" : "ml-72",
        "grid gap-4 grid-cols-3 mt-16",
        className
      )}
    >
      {products.map((product) => (
        <Card key={product.id} className="h-72 scroll-target">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{categories[product.categoryId]}</CardDescription>
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
  );
};
