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
import useClickAway from "react-use/lib/useClickAway";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { AnimatePresence, motion } from "framer-motion";

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
  const refIntersection = React.useRef(null);
  const isIntersecting = useIntersection(refIntersection, { threshold: 1 });
  const refClickAway = React.useRef(null);

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveCategoryId(Number(categoryId));
    }
  }, [isIntersecting, setActiveCategoryId, categoryId]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productModal, setProductModal] =
    React.useState<ProductsWithIngredients | null>(null);

  const openModal = (product: ProductsWithIngredients) => {
    setIsModalOpen(true);
    setProductModal(product);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useClickAway(refClickAway, () => {
    closeModal();
  });

  return (
    <div ref={refIntersection} key={categoryName} id={categoryName}>
      <h3 className="text-xl font-bold mb-4">{categoryName}</h3>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-30 overflow-hidden"
          />
        )}
      </AnimatePresence>

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
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
              <Button onClick={() => openModal(product)}>Select</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-30"
            style={{ width: "min(90vw, 600px)" }}
            ref={refClickAway}
          >
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{productModal?.name}</CardTitle>
                <Button onClick={closeModal}>Close</Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  voluptatibus.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
