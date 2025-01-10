"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./common/container";
import { Logo } from "./logo";
import { Phone, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { CartSheet } from "./cart/cartSheet";
import { Searchbar } from "./searchbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  className?: string;
  checkout?: boolean;
}

export const Header: React.FC<Props> = ({ className, checkout }) => {
  const { data: session } = useSession();
  const isMobile = useIsMobile();
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

          {session ? (
            <div className="header-icon cursor-pointer hover:scale-110 transition-transform duration-150">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
              </Avatar>
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
