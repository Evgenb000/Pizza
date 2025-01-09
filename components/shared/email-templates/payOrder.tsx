import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Readonly<Props>> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Pay for order of ${totalAmount}. Follow <a href={paymentUrl}>this link</a>
    </p>
  </div>
);
