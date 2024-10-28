"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { IngredientItem } from "./ingredientItem";
import { useFilters } from "@/hooks/use-filters";
import { useIngredients } from "@/hooks/use-ingredients";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  className?: string;
  variant?: "floating" | "sidebar" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export function Filter({
  className,
  variant = "sidebar",
  collapsible = "offcanvas",
}: Props) {
  const isMobile = useIsMobile();
  const { ingredients } = useIngredients();
  const {
    values,
    showAll,
    checkedIngredients,
    disabledButton,
    handleInputChange,
    handleSliderChange,
    handlerChecked,
    handleShowAll,
    handleClear,
  } = useFilters();

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
              <Collapsible>
                {!ingredients.length
                  ? !isMobile &&
                    Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          className="w-full h-[20px] rounded-md my-1.5"
                        />
                      ))
                  : ingredients.map((ingredient, index) =>
                      index > 7 ? (
                        <CollapsibleContent key={ingredient.name}>
                          <IngredientItem
                            key={ingredient.id}
                            ingredient={ingredient}
                            checked={checkedIngredients.includes(
                              ingredient.name
                            )}
                            onCheckedChange={() =>
                              handlerChecked(ingredient.name)
                            }
                          />
                        </CollapsibleContent>
                      ) : (
                        <IngredientItem
                          key={ingredient.id}
                          ingredient={ingredient}
                          checked={checkedIngredients.includes(ingredient.name)}
                          onCheckedChange={() =>
                            handlerChecked(ingredient.name)
                          }
                        />
                      )
                    )}
                <CollapsibleTrigger
                  className="mx-auto w-full h-12 p-2 text-sm opacity-70"
                  onClick={() => handleShowAll()}
                >
                  {showAll ? (
                    <div className="flex justify-center items-center gap-1">
                      Hide <ChevronUp />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-1">
                      See all ingredients <ChevronDown />
                    </div>
                  )}
                </CollapsibleTrigger>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Price</SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="flex items-center gap-1 w-full">
              <Input
                type="number"
                step={5}
                placeholder="0"
                value={values[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />
              <Input
                type="number"
                step={5}
                placeholder="100"
                value={values[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </div>
            <Slider
              value={values}
              onValueChange={handleSliderChange}
              step={5}
              className="w-full mt-4"
            />
          </SidebarGroupContent>

          <Button
            className="mt-4"
            onClick={handleClear}
            variant={disabledButton ? "ghost" : "default"}
            disabled={disabledButton}
          >
            Clear all
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
