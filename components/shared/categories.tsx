"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface Props {
  className?: string;
}

const items = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "Inbox",
    url: "#",
  },
  {
    title: "Calendar",
    url: "#",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Search1",
    url: "#",
  },
  {
    title: "Search2",
    url: "#",
  },
  {
    title: "Search3",
    url: "#",
  },
  {
    title: "Search4",
    url: "#",
  },
  {
    title: "Search5",
    url: "#",
  },
  {
    title: "Search6",
    url: "#",
  },
  {
    title: "Search7",
    url: "#",
  },
  {
    title: "Search8",
    url: "#",
  },
  {
    title: "Search9",
    url: "#",
  },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed top-24 transition-all translate-x-72 duration-300",
        className
      )}
    >
      <Tabs defaultValue={items[0].title} className="w-fit">
        <TabsList>
          {items.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              onClick={() => scrollToAnchor(item.title)}
              className=""
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
