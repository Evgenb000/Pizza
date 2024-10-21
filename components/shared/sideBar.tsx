import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const SideBar: React.FC<Props> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
