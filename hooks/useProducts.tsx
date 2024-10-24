import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import React from "react";

interface ReturnProps {
  products: Product[];
}

export const useProducts = (): ReturnProps => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await Api.products.getProducts();
        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  return { products };
};
