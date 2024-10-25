"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useIngredients } from "@/hooks/useIngredients";
import { Skeleton } from "../ui/skeleton";
import { useIsMobile } from "@/hooks/useMobile";

interface Props {
  className?: string;
  variant?: "floating" | "sidebar" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export function AppSidebar({
  className,
  variant = "sidebar",
  collapsible = "offcanvas",
}: Props) {
  const isMobile = useIsMobile();
  const { ingredients } = useIngredients();
  const [checkedIngredients, setCheckedIngredients] = React.useState<string[]>(
    []
  );

  const handlerChecked = (ingredientName: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((name) => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleClearChecked = () => {
    setCheckedIngredients([]);
  };

  return (
    <Sidebar
      collapsible={collapsible}
      variant={variant}
      className={cn("", className)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ingredients</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {!ingredients.length
                ? !isMobile &&
                  Array(15)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-[20px] rounded-md my-1"
                      />
                    ))
                : ingredients.map((ingredient) => (
                    <SidebarMenuItem key={ingredient.name}>
                      <label
                        htmlFor={ingredient.name}
                        className="items-top flex space-x-2 py-1"
                      >
                        <Checkbox
                          id={ingredient.name}
                          checked={checkedIngredients.includes(ingredient.name)}
                          onCheckedChange={() =>
                            handlerChecked(ingredient.name)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <span>{ingredient.name}</span>
                        </div>
                      </label>
                    </SidebarMenuItem>
                  ))}
              <Button
                onClick={handleClearChecked}
                variant={checkedIngredients.length ? "default" : "ghost"}
                disabled={checkedIngredients.length === 0}
                className="mt-4"
              >
                Clear all
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
