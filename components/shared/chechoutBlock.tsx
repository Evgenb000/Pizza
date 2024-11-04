import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const ChechoutBlock: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("w-full bg-white rounded-md shadow-md p-6", className)}>
      {children}
    </div>
  );
};
