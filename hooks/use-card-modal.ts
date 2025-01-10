import React from "react";
import { useClickAway } from "react-use";
import { ProductsWithIngredients } from "@/types/productsWithIngredients";
import { useCartItemsStore } from "@/store/cartItems";
import { useIngredientStore } from "@/store/ingredients";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useToast } from "@/hooks/use-toast";

interface UseCardModalProps {
  product: ProductsWithIngredients | null;
  setIsModalOpen: (value: boolean) => void;
}

export const useCardModal = ({
  product,
  setIsModalOpen,
}: UseCardModalProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { unlockScroll } = useLockScroll();
  const [totalPrice, setTotalPrice] = React.useState<number | null>(null);
  const [chosenIngredients, setChosenIngredients] = React.useState<number[]>(
    []
  );
  const [chosenSize, setChosenSize] = React.useState<string>("20");
  const [chosenType, setChosenType] = React.useState<string>("Traditional");
  const { addCartItem } = useCartItemsStore();
  const { ingredients, loading, fetchIngredients } = useIngredientStore();
  const { toast } = useToast();

  const handleClose = () => {
    setIsModalOpen(false);
    setChosenIngredients([]);
    unlockScroll();
  };

  React.useEffect(() => {
    if (!loading) return;
    fetchIngredients();
  }, [loading, fetchIngredients]);

  useClickAway(ref, handleClose);

  const handleChooseIngredient = (ingredient: number) => {
    setChosenIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  React.useEffect(() => {
    if (product) {
      setTotalPrice(product.items[0].price);
    }
  }, [product]);

  return {
    ref,
    totalPrice,
    chosenIngredients,
    chosenSize,
    chosenType,
    ingredients,
    loading,
    toast,
    handleClose,
    handleChooseIngredient,
    setChosenIngredients,
    setTotalPrice,
    setChosenSize,
    setChosenType,
    addCartItem,
  };
};
