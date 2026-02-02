
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const { state } = useLocation();

  if (!state?.clientSecret) {
    return <p>Invalid payment session</p>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: state.clientSecret }}
    >
      <PaymentForm />
    </Elements>
  );
}


