import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";

export default function ProductPage() {
  return (
    <Container>
      <main className="flex">
        <Sidebar />

        <Cards />
      </main>
    </Container>
  );
}
