import React from "react";
import { Product } from "@prisma/client";
import useClickAway from "react-use/lib/useClickAway";
import { useDebounce } from "react-use";
import { Api } from "@/services/api-client";
import { useLockScroll } from "./use-lock-scroll";

interface ReturnProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  products: Product[];
  focused: boolean;
  setFocused: (value: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
  onClickItem: () => void;
}

export const useSearch = (): ReturnProps => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const { lockScroll, unlockScroll } = useLockScroll();
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
    setSearchQuery("");
  });

  React.useEffect(() => {
    if (focused) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [focused, lockScroll, unlockScroll]);

  useDebounce(
    async () => {
      try {
        const response = await Api.products.getProducts(searchQuery, 5);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    100,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    products,
    focused,
    setFocused,
    ref,
    onClickItem,
  };
};
