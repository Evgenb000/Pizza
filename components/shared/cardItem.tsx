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
import { useCategoryStore } from "@/store/category";
import { CategoryWithProducts } from "@/types/categoryWithProducts";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  allCategories: CategoryWithProducts;
  categoryName: string;
  categoryId: string;
}

export const CardItem: React.FC<Props> = ({
  allCategories,
  categoryName,
  categoryId,
}) => {
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

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2">
        {allCategories.products.map((product) => (
          <Card
            key={product.name}
            className="h-96 flex items-center flex-col justify-between scroll-target"
          >
            <CardHeader className="md:p-4 md:pb-0 lg:p-6 lg:pb-1 pb-1">
              <CardTitle className="text-lg">{product.name}</CardTitle>

              <CardDescription className="text-[10px]/[12px] md:block lg:block hidden  items-center">
                {product.ingredients.map((i) => i.name).join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-col gap-2 text-sm py-0">
              <Image
                className="w-28 h-28 md:w-36 md:h-36"
                src={product.imageUrl}
                alt={product.name}
                width={144}
                height={144}
              />
              <CardDescription>
                Price:
                <br className="md:hidden block" />
                {/* <br /> */}
                <span className="font-bold">
                  {product.items.length === 1
                    ? ` ${product.items[0].price}$`
                    : ` ${Math.min(...product.items.map((item) => item.price))}$ -
                ${Math.max(...product.items.map((item) => item.price))}$`}
                </span>
                <br />
                Sizes:
                <br className="md:hidden block" />
                <span className="font-bold">
                  &nbsp;
                  {product.items.map((item) => item.size).join(", ")}
                </span>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
