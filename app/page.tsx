import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";
import { Categories } from "@/components/shared/categories";
import { FloatingCart } from "@/components/shared/floatingCart";

export default function ProductPage() {
  return (
    <Container>
      <main className="grid grid-cols-[260px_1fr_0_0_0] grid-rows-[40px_1fr_0_0_0] gap-4">
        <Sidebar className="col-span-1 row-span-2 sticky h-fit w-fit top-6" />

        <Categories className="col-start-2 col-span-1 row-span-1 sticky h-fit w-fit top-6" />

        <Cards className="col-start-2 col-span-1 row-start-2 row-span-1" />

        <FloatingCart />
      </main>
    </Container>
  );
}
