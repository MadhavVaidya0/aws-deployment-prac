
import { useEffect, useState } from "react";
import { fetchUserBookings, cancelBooking } from "../api/bookingApi";
import { fetchBookingById } from "../api/bookingApi";
import { getCurrentUserId } from "../config/auth";
import { toast } from "react-toastify";


/**
 * Bookings Page
 * -------------
 * Responsibilities:
 * - Fetch bookings of the logged-in user
 * - Display booking list
 * - Handle loading, error, and empty states
 * - Allow booking cancellation
 *
 * NOTE:
 * - userId is NOT handled here
 * - Auth logic is centralized in auth helper
 */
const Bookings = () => {
  const [searchBookingId, setSearchBookingId] = useState("");
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetchUserBookings();

      // Show only CONFIRMED bookings
      const confirmedBookings = response.data.filter(
        (booking) => booking.status === "CONFIRMED"
      );

     setAllBookings(confirmedBookings);
     setBookings(confirmedBookings);

    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Unable to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  loadBookings();
}, []);




  /**
   * Handle booking cancellation
   * @param {number} bookingId
   */
  const handleCancelBooking = async (bookingId) => {
  try {
    await cancelBooking(bookingId);

    // Remove cancelled booking from UI
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.bookingId !== bookingId)
    );
    
    toast.success("Booking cancelled successfully.");
  } catch (err) {
    console.error("Failed to cancel booking:", err);
    toast.error("Failed to cancel booking. Please try again.");
  }
};



/**
 * Search booking by bookingId
//  */
// const handleSearchByBookingId = async () => {
//   if (!searchBookingId) {
//     // If input empty, reset list
//     setBookings(allBookings);
//     return;
//   }

//   try {
//     const response = await fetchBookingById(searchBookingId);

//     // Backend returns single object, wrap in array for UI consistency
//     setBookings([response.data]);
//   } catch (err) {
//     console.error("Booking not found:", err);
//     setBookings([]);
//   }
// };

// const handleSearchByBookingId = async () => {
//   if (!searchBookingId) {
//     // Reset to all confirmed bookings
//     setBookings(allBookings);
//     return;
//   }

//   try {
//     const response = await fetchBookingById(searchBookingId);
//     const booking = response.data;

//     const currentUserId = getCurrentUserId();

//     //  FRONTEND AUTHORIZATION CHECK
//     if (booking.userId !== currentUserId) {
//       // Booking exists but does NOT belong to this user
//       setBookings([]);
//       return;
//     }

//     // Booking belongs to logged-in user
//     setBookings([booking]);
//   } catch (err) {
//     console.error("Booking not found:", err);
//     setBookings([]);
//   }
// };

const handleSearchByBookingId = async () => {
  if (!searchBookingId) {
    setBookings(allBookings);
    return;
  }

  try {
    const response = await fetchBookingById(searchBookingId);

    // Backend already enforces authorization
    setBookings([response.data]);
  } catch (err) {
    console.error("Booking not found:", err);
    setBookings([]);
  }
};







  /* -------------------- UI STATES -------------------- */

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No bookings found.
      </p>
    );
  }

  /* -------------------- MAIN UI -------------------- */

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
    {/* ===================================================== */}

          <div className="flex items-center gap-2 mb-6 justify-end">
  <input
    type="number"
    placeholder="Search By Booking ID"
    value={searchBookingId}
    onChange={(e) => setSearchBookingId(e.target.value)}
    className="border px-3 py-2 rounded-md"
  />

  <button
    onClick={handleSearchByBookingId}
    className="px-4 py-2 border rounded-md hover:bg-gray-100"
  >
    Search
  </button>
</div>








       {/* ======================================================= */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            {/* Booking Details */}
            <div>
              <h2 className="font-medium">
                {booking.ride?.source} to {booking.ride?.destination}
              </h2>
              <p className="text-sm text-gray-600">
                Booking Id: {booking.bookingId}
              </p>
              <p className="text-sm text-gray-600">
                Date: {booking.ride?.date}
              </p>
              <p className="text-sm text-gray-600">
                {/* Time: {booking.ride?.time} */}
               
              </p>

              <p className="text-sm text-gray-600">
                  Seats Booked: {booking.seatsBooked}
               </p>

              <p className="text-sm text-gray-600">
                Price Per Seat: ₹{booking.ride?.price}
              </p>

              <p className="text-sm font-semibold text-gray-800">
                Total Price: ₹{booking.seatsBooked * booking.ride.price}
              </p>

            </div>

            {/* Actions */}
            <button
              onClick={() => handleCancelBooking(booking.bookingId)}
              className="px-4 py-2 border rounded-md hover:bg-red-50 text-red-600"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
