"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/hooks/use-searchbar";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const Searchbar: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const {
    products,
    focused,
    ref,
    setFocused,
    searchQuery,
    setSearchQuery,
    onClickItem,
  } = useSearch();

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0  bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30 ",
          isMobile && focused && "absolute w-[calc(100vw-20px)]",
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
            "rounded-2xl outline-none w-full pl-11",
            isMobile && "w-full pl-8 text-sm",
            focused && isMobile && "w-screen pl-11"
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
              "absolute w-full right-0 lef bg-white rounded-xl py-2 top-14 shadow-md transition-all hidden opacity-0 z-30",
              focused && "opacity-100 top-12 duration-0 block translate-y-0",
              isMobile && "w-full left-0",
              !focused && isMobile ? "duration-0" : "duration-200",
              focused && isMobile && ""
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
