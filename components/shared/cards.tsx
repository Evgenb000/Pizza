"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useIsScrolled } from "@/hooks/use-scrollY";
import { Api } from "@/services/api-client";
import { Input } from "../ui/input";

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

export const Cards: React.FC<Props> = ({ className }) => {
  // const [products, setProducts] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("");
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  React.useEffect(() => {
    Api.products.search(searchQuery);
  }, [searchQuery]);

  return (
    <div
      className={cn(
        isMobile ? "ml-10" : isScrolled ? "ml-72" : "ml-72",
        "grid gap-4 grid-cols-3 mt-16",
        className,
      )}
    >
      {items.map((item) => (
        <Card key={item.title} className="h-72 scroll-target" id={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Card Content Lorem ipsum dolor sit, amet consectetur adipisicing
              elit.
            </p>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></Input>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
};
