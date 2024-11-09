"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "../ui/input";

interface Props {
  className?: string;
}

export const AuthLog: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
    </div>
  );
};
