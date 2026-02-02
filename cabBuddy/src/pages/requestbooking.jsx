// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getRideById } from "@/api/rideApi";
// import { createPaymentIntent } from "@/api/paymentApi";
// import { format } from "date-fns";

// export default function RequestBooking() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [expanded, setExpanded] = useState(false);
//   const [ride, setRide] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [seatsBooked, setSeatsBooked] = useState(1); // default 1 seat
//   const [processing, setProcessing] = useState(false);

//   const readMore = () => setExpanded((s) => !s);

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       getRideById(id)
//         .then((res) => {
//           setRide(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching ride:", err);
//           setError("Failed to load ride details");
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-600">Loading ride details...</p>
//       </main>
//     );
//   }

//   if (error || !ride) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-red-600">{error || "Ride not found"}</p>
//       </main>
//     );
//   }

//   const rideDate = ride.rideDate ? new Date(ride.rideDate) : new Date();
//   const formattedDate = format(rideDate, "EEEE, d MMMM");
//   const rideTime = ride.rideTime ? ride.rideTime.substring(0, 5) : "00:00";

//   return (
//     <main className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
//       <div className="w-full max-w-3xl">

//         {/* DATE HEADER */}
//         <header className="mb-6">
//           <h1 className="text-4xl font-extrabold text-sky-900">
//             {formattedDate}
//           </h1>
//         </header>

//         {/* ROUTE CARD */}
//         <section className="mb-6">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="grid grid-cols-[72px_24px_1fr] gap-4 items-start">
//               <div>
//                 <div className="text-sky-900 font-semibold">{rideTime}</div>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="w-2.5 h-2.5 rounded-full bg-sky-700 mt-1" />
//                 <div className="flex-1 w-px bg-slate-300 my-1" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
//               </div>
//               <div>
//                 <div className="font-semibold">{ride.source}</div>
//                 <div className="mt-6 font-semibold">{ride.destination}</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* BOOKING BUTTON AREA */}
//         <section className="mt-4">
//           <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">

//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-sm text-slate-500">Seats available</div>
//                 <div className="font-semibold text-sky-900">
//                   {ride.availableSeats} seat{ride.availableSeats !== 1 ? "s" : ""}
//                 </div>
//               </div>

//               <div className="text-right">
//                 <div className="text-sm text-slate-500">Price per seat</div>
//                 <div className="font-semibold text-sky-900">
//                   ₹ {ride.pricePerSeat}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 mt-2">

//               {/* ✅ STRIPE BUTTON – CORRECT */}
//               <button
//                 type="button"
//                 disabled={processing}
//                 onClick={async () => {
//                   try {
//                     setProcessing(true);

//                     const res = await createPaymentIntent({
//                       rideId: Number(id),
//                       seatsBooked: seatsBooked
//                     });

//                     const { clientSecret } = res.data;

//                     navigate("/checkout", {
//                       state: {
//                         clientSecret,
//                         rideId: Number(id),
//                         seatsBooked
//                       }
//                     });

//                   } catch (err) {
//                     console.error("Payment init failed", err);
//                     alert("Unable to start payment. Please try again.");
//                   } finally {
//                     setProcessing(false);
//                   }
//                 }}
//                 className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center rounded-lg 
//                   ${processing ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"}
//                   text-white px-5 py-3 font-medium shadow-sm`}
//               >
//                 {processing ? "Processing..." : "Book ride"}
//               </button>

//               {/* CONTACT DRIVER – UNCHANGED */}
//               <button
//                 type="button"
//                 className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 px-5 py-3 font-medium hover:bg-slate-50"
//               >
//                 Contact driver
//               </button>

//             </div>
//           </div>
//         </section>

//       </div>
//     </main>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRideById } from "@/api/rideApi";
import { createPaymentIntent } from "@/api/paymentApi";
import { format } from "date-fns";

export default function RequestBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [seatsBooked, setSeatsBooked] = useState(1); // ✅ seat selection
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getRideById(id)
        .then((res) => {
          setRide(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching ride:", err);
          setError("Failed to load ride details");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading ride details...</p>
      </main>
    );
  }

  if (error || !ride) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error || "Ride not found"}</p>
      </main>
    );
  }

  const rideDate = ride.rideDate ? new Date(ride.rideDate) : new Date();
  const formattedDate = format(rideDate, "EEEE, d MMMM");
  const rideTime = ride.rideTime ? ride.rideTime.substring(0, 5) : "00:00";

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl">

        {/* DATE HEADER */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-sky-900">
            {formattedDate}
          </h1>
        </header>

        {/* ROUTE CARD */}
        <section className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-[72px_24px_1fr] gap-4 items-start">
              <div>
                <div className="text-sky-900 font-semibold">{rideTime}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-700 mt-1" />
                <div className="flex-1 w-px bg-slate-300 my-1" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              </div>
              <div>
                <div className="font-semibold">{ride.source}</div>
                <div className="mt-6 font-semibold">{ride.destination}</div>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING AREA */}
        <section className="mt-4">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">

            {/* SEATS + PRICE */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Seats available</div>
                <div className="font-semibold text-sky-900">
                  {ride.availableSeats} seat{ride.availableSeats !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-500">Price per seat</div>
                <div className="font-semibold text-sky-900">
                  ₹ {ride.pricePerSeat}
                </div>
              </div>
            </div>

            {/* ✅ SEAT SELECTION */}
            <div className="mt-2">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Seats to book
              </label>

              <select
                value={seatsBooked}
                onChange={(e) => setSeatsBooked(Number(e.target.value))}
                className="w-32 border rounded px-3 py-2"
              >
                {Array.from(
                  { length: ride.availableSeats },
                  (_, i) => i + 1
                ).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {/* LIVE TOTAL */}
              <div className="mt-2 text-sm text-slate-700">
                Total price:{" "}
                <span className="font-semibold">
                  ₹ {ride.pricePerSeat * seatsBooked}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="button"
                disabled={processing}
                onClick={async () => {
                  try {
                    setProcessing(true);

                    const res = await createPaymentIntent({
                      rideId: Number(id),
                      seatsBooked: seatsBooked
                    });

                    const { clientSecret } = res.data;

                    navigate("/checkout", {
                      state: {
                        clientSecret,
                        rideId: Number(id),
                        seatsBooked
                      }
                    });

                  } catch (err) {
                    console.error("Payment init failed", err);
                    alert("Unable to start payment. Please try again.");
                  } finally {
                    setProcessing(false);
                  }
                }}
                className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center rounded-lg 
                  ${processing ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"}
                  text-white px-5 py-3 font-medium shadow-sm`}
              >
                {processing ? "Processing..." : "Book ride"}
              </button>

              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 px-5 py-3 font-medium hover:bg-slate-50"
              >
                Contact driver
              </button>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
