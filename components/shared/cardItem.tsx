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
import { useIntersection } from "react-use";
import { useProducts } from "@/hooks/use-products";
import { useCategoryStore } from "@/store/category";
import { useGroupByCategory } from "@/hooks/use-group-by-caterogy";

interface Props {
  className?: string;
  categoryName: string;
  categoryId: string;
}

export const CardItem: React.FC<Props> = ({ categoryName, categoryId }) => {
  const { products } = useProducts();
  const groupedProducts = useGroupByCategory(products);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const ref = React.useRef(null);
  const isIntersecting = useIntersection(ref, { threshold: 1 });

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveCategoryId(Number(categoryId));
    }
  }, [isIntersecting, setActiveCategoryId, categoryId]);

  return (
    <div ref={ref} key={categoryName} id={categoryName}>
      <h3 className="text-xl font-bold mb-4">{categoryName}</h3>

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {groupedProducts[Number(categoryId)]?.map((product) => (
          <Card key={product.name} className="h-72 scroll-target">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{categoryName}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={60}
                height={60}
              />
            </CardContent>
            <CardFooter />
          </Card>
        ))}
      </div>
    </div>
  );
};
