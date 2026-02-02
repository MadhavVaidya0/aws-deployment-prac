import axiosInstance from "./axiosInstance";
import { getCurrentUserId } from "../config/auth";

/**
 * Fetch bookings of the currently logged-in user
 * ----------------------------------------------
 * Backend endpoint:
 * GET /api/bookings/user/{userId}
 *
 * userId is derived from centralized auth helper
 */
export const fetchUserBookings = async () => {
  const userId = getCurrentUserId();
  return axiosInstance.get(`/bookings/user/${userId}`);
};

/**
 * Cancel a booking by bookingId
 * -----------------------------
 * Backend endpoint:
 * PUT /api/bookings/{id}/cancel
 */
export const cancelBooking = async (bookingId) => {
  return axiosInstance.put(`/bookings/${bookingId}/cancel`);
};


/**
 * Get booking by bookingId
 * Backend: GET /api/bookings/{id}
 */
export const fetchBookingById = (bookingId) => {
  return axiosInstance.get(`/bookings/${bookingId}`);
};


// CREATE BOOKING (USED AFTER PAYMENT SUCCESS)
export const createBooking = (data) => {
  return axiosInstance.post("/bookings", data);
};
