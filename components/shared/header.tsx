"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./common/container";
import { Logo } from "./logo";
import { Phone, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { CartSheet } from "./cart/cartSheet";
import { Searchbar } from "./searchbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  className?: string;
  checkout?: boolean;
}

export const Header: React.FC<Props> = ({ className, checkout }) => {
  const isMobile = useIsMobile();
  const isUserLoggedIn = false;
  const iconSize = isMobile ? 24 : 32;

  return (
    <header className={cn("w-full p-2", className)}>
      <Container className="flex justify-between items-center w-full gap-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />

            <div className={cn(isMobile ? "w-16" : '"w-40"')}>
              <h1 className={cn("font-bold", isMobile ? " text-sm" : "")}>
                Pizza
              </h1>

              <h2 className={cn(isMobile ? " text-xs" : "")}>
                Couldn&apos;t be better
              </h2>
            </div>
          </div>
        </Link>

        {!checkout && <Searchbar />}
        
        <div
          className={cn("flex items-center h-6 top-1", isMobile ? "" : "gap-2")}
        >
          <Link href={"tel:+380000000000"} className="interactive header-icon">
            <Phone className="" size={iconSize} aria-label="Call us" />
          </Link>

          <Separator orientation="vertical" />

          {isUserLoggedIn ? (
            <div className="interactive header-icon">
              <UserCheck size={iconSize} aria-label="User logged in" />
            </div>
          ) : (
            <Link href="/authentication" className="interactive header-icon">
              <User size={iconSize} aria-label="User not logged in" />
            </Link>
          )}

          {!checkout && <Separator orientation="vertical" />}

          {!checkout && <CartSheet iconSize={iconSize} />}
        </div>
      </Container>
      <Separator className="max-w-[1280px] w-full mx-auto my-1" />
    </header>
  );
};
