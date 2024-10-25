"use client";

import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const Searchbar: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef(null);
  const isMobile = useIsMobile();

  useClickAway(ref, () => {
    setFocused(false);
    setSearchQuery("");
  });

  React.useEffect(() => {
    if (focused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [focused]);

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

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30 ",
          isMobile && focused && "absolute w-[calc(100vw-40px)]",
          className
        )}
      >
        <Search
          className={cn(
            "absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400",
            isMobile && "h-5 w-5"
          )}
          onClick={() => setFocused(true)}
        />
        <input
          className={cn(
            "rounded-2xl outline-none w-full bg-gray-100 pl-11",
            isMobile && "w-full pl-8 text-sm",
            focused && isMobile && "w-[calc(100vw-40px)] pl-11"
          )}
          type="text"
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all invisible opacity-0 z-30",
              focused && "opacity-100 top-12 duration-0 visible translate-y-0",
              isMobile && "w-[calc(100vw-40px)] left-0",
              !focused && isMobile ? "duration-0" : "duration-200"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};