"use client";

import { useIsScrolled } from "@/hooks/use-scrollY";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

const items = [
  { title: "Category 1" },
  { title: "Category 2" },
  { title: "Category 3" },
  { title: "Category 4" },
  { title: "Category 5" },
  { title: "Category 6" },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const isScrolled = useIsScrolled();

  return (
    <div
      className={cn(
        "flex rounded-xl shadow bg-gray-300 p-0.5 gap-1 fixed top-20 duration-300 transition-transform translate-x-72",
        isScrolled ? "translate-y-[-40px]" : "translate-y-[24px]",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="grid items-center justify-center w-40 h-12 rounded-xl bg-white"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
