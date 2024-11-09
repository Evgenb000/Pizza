"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "../ui/input";

interface Props {
  className?: string;
}

export const AuthReg: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Input name="name" type="text" />
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <Input name="confirmPassword" type="password" />
    </div>
  );
};
