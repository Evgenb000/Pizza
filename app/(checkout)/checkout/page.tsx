"use client";

import { CheckoutCart } from "@/components/shared/checkout/checkoutCart";
import { ChechoutLocation } from "@/components/shared/checkout/checkoutLocation";
import { CheckoutPayment } from "@/components/shared/checkout/checkoutPayment";
import { ChechoutUserInfo } from "@/components/shared/checkout/checkoutUserInfo";
import { Container } from "@/components/shared/common/container";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
  TCheckoutFormSchema,
} from "@/shared/constants/checoutFormSchema";
import { FormProvider, useForm } from "react-hook-form";
import { ContentBlock } from "@/components/shared/common/contentBlock";
import React from "react";
import { createOrder } from "@/app/action";

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

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const url = await createOrder(data);

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-12">
            <main className="w-full">
              <ContentBlock className="mt-12">
                <CheckoutCart />
              </ContentBlock>

              <ContentBlock className="mt-12">
                <ChechoutUserInfo />
              </ContentBlock>

              <ContentBlock className="mt-12">
                <ChechoutLocation />
              </ContentBlock>
            </main>

            <ContentBlock className="mt-12 w-fit h-fit sticky top-6">
              <CheckoutPayment />
            </ContentBlock>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
