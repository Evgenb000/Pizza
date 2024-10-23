import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const amountParam = req.nextUrl.searchParams.get("amount");
  const amount = amountParam ? Number(amountParam) : null;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    ...(amount ? { take: amount } : {}),
  });

  return NextResponse.json(products);
}
