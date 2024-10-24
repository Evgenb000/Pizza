"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./appSidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { Container } from "./container";
import { useIsScrolled } from "@/hooks/useScrollY";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  return (
    <div
      className={cn(
        "transition-all top-20 duration-300 fixed",
        isScrolled && "floatingBlocks",
        className
      )}
    >
      {isMobile ? (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      ) : (
        <Container>
          <SidebarProvider className="min-h-fit">
            <AppSidebar
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
