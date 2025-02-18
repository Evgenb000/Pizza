import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QueryString from "qs";
import React from "react";

interface ReturnProps {
  values: number[];
  showAll: boolean;
  checkedIngredients: string[];
  disabledButton: boolean;
  handleInputChange: (index: number, newValue: string) => void;
  handleSliderChange: (newValues: number[]) => void;
  handlerChecked: (ingredientName: string) => void;
  handleShowAll: () => void;
  handleClear: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showAll, setShowAll] = React.useState(false);
  const [checkedIngredients, setCheckedIngredients] = React.useState<string[]>(
    () => {
      const ingredients = searchParams.get("checkedIngredients");
      return ingredients ? ingredients.split(",") : [];
    }
  );

  const [values, setValues] = React.useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 40,
  ]);

  const filtered = useMemo(() => {
    const filtered = {
      ...(values[0] !== 0 && { minPrice: values[0] }),
      ...(values[1] !== 40 && { maxPrice: values[1] }),
      checkedIngredients:
        checkedIngredients.length > 0 ? checkedIngredients : undefined,
    };

    return filtered;
  }, [values, checkedIngredients]);

  const query = useMemo(() => {
    return QueryString.stringify(filtered, {
      arrayFormat: "comma",
    });
  }, [filtered]);

  React.useEffect(() => {
    router.push(`?${query}`, { scroll: false });
  }, [query, router]);

  const handleInputChange = (index: number, newValue: string) => {
    const clampedValue = Math.max(0, Math.min(40, Number(newValue)));
    const updatedValues = [...values];
    updatedValues[index] = clampedValue;
    if (updatedValues[0] > updatedValues[1]) {
      setValues([updatedValues[1], updatedValues[0]]);
    } else {
      setValues(updatedValues);
    }
  };

  const handleSliderChange = (newValues: number[]) => {
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
    setValues([0, 40]);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const disabledButton =
    checkedIngredients.length === 0 &&
    values.includes(0) &&
    values.includes(40);

  return {
    values,
    showAll,
    checkedIngredients,
    disabledButton,
    handleInputChange,
    handleSliderChange,
    handlerChecked,
    handleShowAll,
    handleClear,
  };
};
