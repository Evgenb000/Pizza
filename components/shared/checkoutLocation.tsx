"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { LabeledInput } from "./labeledInput";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const ChechoutLocation: React.FC<Props> = ({ className }) => {
  const { register } = useFormContext();

  return (
    <section className={cn("", className)}>
      <h2>Delivery address</h2>
      <Separator orientation="horizontal" />
      <div className={cn("flex flex-col gap-4 mt-6")}>
        <LabeledInput
          label="Address"
          placeholder="Enter your address..."
          type="address"
          {...register("address")}
          required
        />

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Comment</span>
          <Textarea placeholder="Enter your comment..."></Textarea>
        </label>
      </div>
    </section>
  );
};
