import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const SearchbarPopup: React.FC<Props> = ({ className }) => {
  return <div className={cn("", className)}>123123</div>;
};
