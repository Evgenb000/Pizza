import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";
import { Categories } from "@/components/shared/categories";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { FloatingCart } from "@/components/shared/floatingCart";

export default function ProductPage() {
  // const isMobile = useIsMobile();
  return (
    <Container>
      <main className="md:grid flex md:grid-cols-[260px_1fr] md:grid-rows-[40px_1fr] md:gap-4 gap-2 mx-2">
        <Sidebar className="md:col-span-1 md:row-span-2 sticky h-fit w-fit top-6" />

        <Categories className="md:col-start-2 md:col-span-1 md:row-span-1 sticky  h-fit w-fit top-6" />

        <Cards className="md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1" />

        {/* <FloatingCart /> */}
      </main>
    </Container>
  );
}
