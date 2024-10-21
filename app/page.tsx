import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";
import { Categories } from "@/components/shared/categories";
import { FloatingCart } from "@/components/shared/floatingCart";

export default function ProductPage() {
  return (
    <Container>
      <Categories />

      <FloatingCart />

      <main className="flex mt-4 gap-5">
        <Sidebar />

        <Cards />
      </main>
    </Container>
  );
}
