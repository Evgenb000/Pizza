"use client";

import { useIsScrolled } from "@/hooks/use-scrollY";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

const items = [{ title: "Cart" }];

export const FloatingCart: React.FC<Props> = ({ className }) => {
  const isScrolled = useIsScrolled();

  return (
    <div
      className={cn(
        "flex items-center justify-center shadow gap-1 rounded-full border bg-gray-300 w-20 h-20 fixed bottom-0 right-0 transition-transform duration-300",
        isScrolled
          ? "translate-y-[-2rem] translate-x-[-2rem]" // Для больших экранов, уменьшаем позицию на средних и мобильных
          : "translate-y-[10rem] translate-x-[15rem] ", // Адаптируем исходную позицию на меньших экранах
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="items-center justify-center" // Изменяем размеры на мобильных устройствах
        >
          1123
        </div>
      ))}
    </div>
  );
};
