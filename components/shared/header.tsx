"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import { Logo } from "./logo";
import { Phone, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { SheetSide } from "./sheet";
import { Searchbar } from "./searchbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const signIn = false;
  let iconSize = 32;
  if (isMobile) {
    iconSize = 24;
  } else {
    iconSize = 32;
  }

  return (
    <header className={cn("w-full p-2", className)}>
      <Container
        className={cn(
          "flex justify-between items-center w-full",
          isMobile ? "gap-1" : "gap-4"
        )}
      >
        <Link href={"/"}>
          <div
            className={cn(isMobile ? "gap-2" : "gap-8", "flex items-center ")}
          >
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

        <Searchbar />

        <div className={cn("flex items-center h-6", isMobile ? "" : "gap-2")}>
          <Link href={"tel:+380000000000"}>
            <Phone
              className="interactive"
              size={iconSize}
              aria-label="Call us"
            />
          </Link>

          <Separator orientation="vertical" />

          {signIn ? (
            <UserCheck
              className="interactive"
              size={iconSize}
              aria-label="User logged in"
            />
          ) : (
            <User
              className="interactive"
              size={iconSize}
              aria-label="User not logged in"
            />
          )}

          <Separator orientation="vertical" />

          <SheetSide iconSize={iconSize} />
        </div>
      </Container>
      <Separator className="max-w-[1280px] w-full mx-auto my-1" />
    </header>
  );
};
