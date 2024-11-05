"use client";

import { ChechoutBlock } from "@/components/shared/chechoutBlock";
import { CheckoutCart } from "@/components/shared/checkoutCart";
import { ChechoutLocation } from "@/components/shared/checkoutLocation";
import { CheckoutPayment } from "@/components/shared/checkoutPayment";
import { ChechoutUserInfo } from "@/components/shared/checkoutUserInfo";
import { Container } from "@/components/shared/container";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  TCheckoutFormSchema,
} from "@/shared/constants/checoutFormSchema";
import { FormProvider, useForm } from "react-hook-form";

export default function CheckoutPage() {
  const form = useForm<TCheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: TCheckoutFormSchema) => {
    try {
      console.log("TODO: Implement payment processing", data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Container>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-12">
            <main className="w-full">
              <ChechoutBlock className="mt-12">
                <CheckoutCart />
              </ChechoutBlock>

              <ChechoutBlock className="mt-12">
                <ChechoutUserInfo />
              </ChechoutBlock>

              <ChechoutBlock className="mt-12">
                <ChechoutLocation />
              </ChechoutBlock>
            </main>

            <ChechoutBlock className="mt-12 w-fit h-fit sticky top-6">
              <CheckoutPayment />
            </ChechoutBlock>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
