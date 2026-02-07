"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  onSuccess: () => void;
}

export default function PayPalButton({ onSuccess }: Props) {
  return (
    <PayPalScriptProvider
      options={{
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        createOrder={(data, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{ amount: { value: "3.00", currency_code: "USD"} }],
          })
        }
        onApprove={(data, actions) => actions.order.capture().then(() => onSuccess())}
      />
    </PayPalScriptProvider>
  );
}



