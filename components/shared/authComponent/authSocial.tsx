import { cn } from "@/lib/utils";
import React from "react";
import { ContentBlock } from "../common/contentBlock";
import { AtSign, Github } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface Props {
  className?: string;
}

export const AuthSocial: React.FC<Props> = ({ className }) => {
  const size = 32;

  return (
    <ContentBlock className={cn("flex flex-col gap-1 p-1", className)}>
      {[AtSign, Github].map((Icon, index) => (
        <Link
          key={index}
          href="#"
          className="p-3"
          onClick={() => {
            signIn("github", {
              callbackUrl: "/",
              redirect: true,
            });
          }}
        >
          <Icon size={size} />
        </Link>
      ))}
    </ContentBlock>
  );
};
