"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  onSuccess: () => void;
}

export default function PayPalButton({ onSuccess }: Props) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: "3.00" } }],
          })
        }
        onApprove={(data, actions) => actions.order.capture().then(() => onSuccess())}
      />
    </PayPalScriptProvider>
  );
}
