import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import { LabeledInput } from "./labeledInput";

interface Props {
  className?: string;
}

export const ChechoutUserInfo: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn("", className)}>
      <h2>Info</h2>
      <Separator orientation="horizontal" />
      <div className={cn("grid grid-cols-2 gap-4 mt-6")}>
        <LabeledInput
          label="Name"
          placeholder="Enter your name..."
          type="name"
          required
        />
        <LabeledInput
          label="Last name"
          placeholder="Enter your last name..."
          type="lastName"
          required
        />
        <LabeledInput
          label="Email"
          placeholder="Enter your email..."
          type="email"
        />
        <LabeledInput
          label="Phone number"
          placeholder="Enter your phone number..."
          type="tel"
          required
        />
      </div>
    </section>
  );
};
