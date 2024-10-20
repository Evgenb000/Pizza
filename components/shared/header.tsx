import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import { Logo } from "./logo";
import { Phone, ShoppingCart, User, UserCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const signIn = false;
  const iconSize = 32;

  return (
    <header className={cn("w-full p-3", className)}>
      <Container className="flex justify-between items-center w-full">
        <div className="flex items-center gap-8">
          <Logo />
          <div>
            <h1 className="font-bold">Pizza</h1>
            <h2>Couldn&apos;t be better</h2>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={"tel:+380000000000"}>
            <Phone size={iconSize} aria-label="Call us" />
          </Link>
          {signIn ? (
            <UserCheck size={iconSize} aria-label="User logged in" />
          ) : (
            <User size={iconSize} aria-label="User not logged in" />
          )}
          <ShoppingCart size={iconSize} aria-label="Shopping cart" />
        </div>
      </Container>
    </header>
  );
};
