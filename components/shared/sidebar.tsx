"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { SidebarFilter } from "./sidebarFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Container } from "./common/container";
import { useIsScrolled } from "@/hooks/use-scroll-y";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  return (
    <div
      className={cn("", isScrolled && !isMobile && "floatingBlocks", className)}
    >
      {isMobile ? (
        <SidebarProvider
          className={cn(
            "fixed duration-300",
            isScrolled && "translate-y-[-52px]"
          )}
        >
          <SidebarFilter />
          <SidebarTrigger className="w-10 h-10 bgcolor border rounded-md floatingBlocks" />
        </SidebarProvider>
      ) : (
        <Container>
          <SidebarProvider className="min-h-fit">
            <SidebarFilter
              collapsible="none"
              variant="floating"
              className="border rounded-md"
            />
          </SidebarProvider>
        </Container>
      )}
    </div>
  );
};
