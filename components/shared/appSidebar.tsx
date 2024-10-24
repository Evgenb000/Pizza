import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useIngredientsStore } from "@/store/ingredients";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  variant?: "floating" | "sidebar" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export let chIng: string[]; 

export function AppSidebar({
  className,
  variant = "sidebar",
  collapsible = "offcanvas",
}: Props) {
  const { ingredients, fetchIngredients } = useIngredientsStore();
  const [checkedIngredients, setCheckedIngredients] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  React.useEffect(() => {
    chIng = checkedIngredients
  }, [checkedIngredients]);

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
            <SidebarMenu>
              {ingredients.map((ingredient) => (
                <SidebarMenuItem key={ingredient.name}>
                  <a href={ingredient.imageUrl}></a>

                  <div className="items-top flex space-x-2">
                    <Checkbox
                      id={ingredient.name}
                      checked={checkedIngredients.includes(ingredient.name)}
                      onCheckedChange={() => handlerChecked(ingredient.name)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={ingredient.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <span>{ingredient.name}</span>
                      </label>
                    </div>
                  </div>
                </SidebarMenuItem>
              ))}
              <Button onClick={handleClearChecked}>Clear all</Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
