import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import { LabeledInput } from "./labeledInput";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const ChechoutUserInfo: React.FC<Props> = ({ className }) => {
  const { register } = useFormContext();

  return (
    <section className={cn("", className)}>
      <h2>Info</h2>

      <Separator orientation="horizontal" />

      <div className={cn("grid grid-cols-2 gap-4 mt-6")}>
        {["name", "lastName", "email", "phoneNumber"].map((name) => {
          const label = name[0].toUpperCase() + name.slice(1);
          const placeholder = `Enter your ${name === "lastName" ? "last name" : name === "phoneNumber" ? "phone number" : label.toLowerCase()}...`;
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
      </div>
    </section>
  );
};
