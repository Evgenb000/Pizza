import { ChechoutBlock } from "@/components/shared/chechoutBlock";
import { CheckoutCart } from "@/components/shared/checkoutCart";
import { ChechoutLocation } from "@/components/shared/checkoutLocation";
import { CheckoutPayment } from "@/components/shared/checkoutPayment";
import { ChechoutUserInfo } from "@/components/shared/checkoutUserInfo";
import { Container } from "@/components/shared/container";

export default function CheckoutPage() {
  return (
    <Container>
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

        <ChechoutBlock className="mt-12 w-fit">
          <CheckoutPayment />
        </ChechoutBlock>
      </div>
    </Container>
  );
}
