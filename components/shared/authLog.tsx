"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { LabeledInput } from "./labeledInput";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export const AuthLog: React.FC<Props> = ({ className }) => {
  const { register } = useFormContext();

  return (
    <div className={cn("", className)}>
      {["email", "password"].map((name) => {
        const label = name[0].toUpperCase() + name.slice(1);
        const placeholder = `Enter your ${name === "email" ? "email" : "password"} ...`;
        return (
          <LabeledInput
            key={name}
            label={label}
            placeholder={placeholder}
            type={name}
            required
            {...register(name as keyof typeof register)}
          />
        );
      })}
      
      <Button type="submit" className="mt-4">
        Log in
      </Button>
    </div>
  );
};
