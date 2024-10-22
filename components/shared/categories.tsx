"use client";

// import { useIsScrolled } from "@/hooks/use-scrollY";
import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

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
  // const isScrolled = useIsScrolled();

  return (
    <div
      className={cn(
        "fixed top-24 transition-all translate-x-72 duration-300",
        // isScrolled ? "top-4" : "",
        className
      )}
    >
      <Tabs defaultValue={items[0].title} className="w-fit">
        <TabsList>
          {items.map((item) => (
            <TabsTrigger key={item.title} value={item.title} className="">
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
