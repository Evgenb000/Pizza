import { Checkbox } from "../ui/checkbox";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Ingredient } from "@prisma/client";

interface IngredientItemProps {
  ingredient: Ingredient;
  checked: boolean;
  onCheckedChange: () => void;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  ingredient,
  checked,
  onCheckedChange,
}) => (
  <SidebarMenuItem>
    <label
      htmlFor={ingredient.name}
      className="items-top flex space-x-2 py-1 cursor-pointer"
    >
      <Checkbox
        id={ingredient.name}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <div className="grid gap-1.5 leading-none">
        <span>{ingredient.name}</span>
      </div>
    </label>
  </SidebarMenuItem>
);
