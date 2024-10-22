"use client";

import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";
import { Categories } from "@/components/shared/categories";
import { FloatingCart } from "@/components/shared/floatingCart";
import { useIsScrolled } from "@/hooks/use-scrollY";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const isScrolled = useIsScrolled();

  return (
    <Container>
      <main className="flex mt-4 gap-5">
        <Categories className={cn(isScrolled ? "top-4" : "")} />

        <Sidebar className={cn(isScrolled ? "top-4" : "")} />

        <FloatingCart />

        <Cards />
      </main>
    </Container>
  );
}
