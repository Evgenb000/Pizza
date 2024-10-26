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
import { useIngredients } from "@/hooks/use-ingredients";
import { Skeleton } from "../ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

interface Props {
  className?: string;
  variant?: "floating" | "sidebar" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

interface IngredientItemProps {
  ingredient: Ingredient;
}

export function AppSidebar({
  className,
  variant = "sidebar",
  collapsible = "offcanvas",
}: Props) {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = React.useState(false);
  const { ingredients } = useIngredients();
  const [checkedIngredients, setCheckedIngredients] = React.useState<string[]>(
    []
  );
  const [values, setValues] = React.useState([0, 100]);

  const handleInputChange = (index: number, newValue: string) => {
    const clampedValue = Math.max(0, Math.min(100, Number(newValue)));
    const updatedValues = [...values];
    updatedValues[index] = clampedValue;
    if (updatedValues[0] > updatedValues[1]) {
      setValues([updatedValues[1], updatedValues[0]]);
    } else {
      setValues(updatedValues);
    }
  };

  const handleSliderChange = (newValues: React.SetStateAction<number[]>) => {
    setValues(newValues);
  };

  const handlerChecked = (ingredientName: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((name) => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleClear = () => {
    setCheckedIngredients([]);
    setValues([0, 100]);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => (
    <SidebarMenuItem key={ingredient.name}>
      <label
        htmlFor={ingredient.name}
        className="items-top flex space-x-2 py-1"
      >
        <Checkbox
          id={ingredient.name}
          checked={checkedIngredients.includes(ingredient.name)}
          onCheckedChange={() => handlerChecked(ingredient.name)}
        />
        <div className="grid gap-1.5 leading-none">
          <span>{ingredient.name}</span>
        </div>
      </label>
    </SidebarMenuItem>
  );

  const disabledButton =
    checkedIngredients.length === 0 &&
    values.includes(0) &&
    values.includes(100);

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
                          <IngredientItem ingredient={ingredient} />
                        </CollapsibleContent>
                      ) : (
                        <IngredientItem
                          key={ingredient.name}
                          ingredient={ingredient}
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
