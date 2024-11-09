"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { LabeledInput } from "./labeledInput";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const AuthReg: React.FC<Props> = ({ className }) => {
  const { register } = useFormContext();

  return (
    <div className={cn("", className)}>
      {[
        "name",
        "lastName",
        "email",
        "phoneNumber",
        "password",
        "confirmPassword",
      ].map((name) => {
        const label =
          name.charAt(0).toUpperCase() +
          name.slice(1).replace(/([A-Z])/g, " $1");
        const placeholder = `Enter your ${label.toLowerCase()}...`;
        return (
          <LabeledInput
            key={name}
            label={label}
            placeholder={placeholder}
            type={name === "confirmPassword" ? "password" : name}
            required
            {...register(name as keyof typeof register)}
          />
        );
      })}

      <Button type="submit" className="mt-4">
        Register
      </Button>
    </div>
  );
};
