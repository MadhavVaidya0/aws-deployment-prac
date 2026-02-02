
// import { useLocation, useNavigate } from "react-router-dom";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { createBooking } from "@/api/bookingApi";

// export default function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ THIS IS CRITICAL
//   const { clientSecret, rideId, seatsBooked } = location.state || {};

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       navigate("/payment-failed");
//       return;
//     }

   
//     await createBooking({
//       rideId: rideId,
//       seatsBooked: seatsBooked
//     });

//     navigate("/my-bookings");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit">Pay Now</button>
//     </form>
//   );
// }

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "@/api/bookingApi";
import { useState } from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { rideId, seatsBooked } = state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;


    try {
      setIsProcessing(true);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/my-bookings",
        },
        redirect: "if_required",
      });

      if (error) {
        navigate("/payment-failed");
        return;
      }

      await createBooking({ rideId, seatsBooked });
      navigate("/my-bookings");

    } catch (e) {
      // handle the error
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: "60px auto",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          background: "#0ea5e9",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 600,
        }}
      >
        Pay Now
      </button>
    </form>
  );
}
