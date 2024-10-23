import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import { Logo } from "./logo";
import { Phone, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { SheetSide } from "./sheet";
import { Searchbar } from "./searchbar";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const signIn = false;
  const iconSize = 32;

  return (
    <header className={cn("w-full p-2", className)}>
      <Container className="flex gap-24 justify-between items-center w-full">
        <Link href={"/"}>
          <div className="flex items-center gap-8">
            <Logo width={32} height={32} />
            <div className="w-40">
              <h1 className="font-bold">Pizza</h1>

              <h2>Couldn&apos;t be better</h2>
            </div>
          </div>
        </Link>

        <Searchbar />

        <div className="flex gap-2 items-center h-6">
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
