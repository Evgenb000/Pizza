import { Container } from "@/components/shared/container";
import { Cards } from "@/components/shared/cards";
import { Sidebar } from "@/components/shared/sidebar";
import { NavCategories } from "@/components/shared/navCategories";
import { findPizzas, GetSearchParams } from "@/services/findPizzas";
import { prisma } from "@/prisma/prisma-client";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  const ingredientsNames = searchParams.checkedIngredients?.split(",");
  const ingredientsIdArr = ingredientsNames
    ? await prisma.ingredient
        .findMany({
          where: { name: { in: ingredientsNames } },
          select: { id: true },
        })
        .then((ingredients) => ingredients.map((ingredient) => ingredient.id))
    : undefined;

  console.log(ingredientsIdArr);
  return (
    <Container>
      <main className="md:grid flex flex-col md:grid-cols-[260px_1fr] md:grid-rows-[40px_1fr] md:gap-4 gap-2 mx-2">
        <Sidebar className="md:col-span-1 md:row-span-2 sticky md:h-fit w-fit top-6" />

        <NavCategories className="md:col-start-2 md:col-span-1 md:row-span-1 sticky  h-fit w-fit top-6" />

        <Cards
          categories={categories}
          className="md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1"
        />
      </main>
    </Container>
  );
}
