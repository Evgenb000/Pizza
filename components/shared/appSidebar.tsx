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
  const { ingredients, fetchIngredients } = useIngredientsStore();

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <Sidebar
      collapsible={collapsible}
      variant={variant}
      className={cn("", className)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ingrediants</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ingredients.map((ingredient) => (
                <SidebarMenuItem key={ingredient.name}>
                  <SidebarMenuButton asChild>
                    <a href={ingredient.imageUrl}>
                      <span>{ingredient.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
