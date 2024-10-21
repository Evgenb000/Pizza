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
    title: "Settings",
    url: "#",
  },
];

export const Cards: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        isMobile ? "ml-10" : "ml-72",
        "grid gap-4 grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <Card key={item.title} className="h-72">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
