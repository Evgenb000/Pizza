"use client";

import { AuthPanel } from "@/components/shared/authComponent/authPanel";
import { AuthSocial } from "@/components/shared/authComponent/authSocial";
import { ContentBlock } from "@/components/shared/common/contentBlock";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Authentication() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <AuthPanel />

        <ContentBlock>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Go to Home
          </Link>
        </ContentBlock>
      </div>

      <AuthSocial className="h-fit" />
    </div>
  );
}
