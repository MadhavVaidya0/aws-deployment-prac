import api from "./axiosInstance";

// ==============================
// CREATE RIDE (JWT REQUIRED)
// ==============================
export const createRide = (rideData) => {
  return api.post("/rides", rideData);
};

// ==============================
// SEARCH RIDES (PUBLIC - NO JWT)
// ==============================
export const searchRides = (source, destination, rideDate) => {
  const params = new URLSearchParams();

  if (source) params.append("source", source);
  if (destination) params.append("destination", destination);
  if (rideDate) params.append("rideDate", rideDate); // ✅ FIXED

  // ❌ Do NOT attach Authorization header
  return api.get(`/rides/search?${params.toString()}`);
};

// ==============================
// GET RIDE BY ID
// ==============================
export const getRideById = (rideId) => {
  return api.get(`/rides/${rideId}`);
};

// ==============================
// CANCEL RIDE (JWT REQUIRED)
// ==============================
export const cancelRide = (rideId) => {
  return api.put(`/rides/${rideId}/cancel`);
};

// ==============================
// GET ALL RIDES
// ==============================
export const getAllRides = () => {
  return api.get("/rides/status");
};

// ==============================
// GET RIDES BY DRIVER ID (JWT)
// ==============================
export const getRidesByDriver = (driverId) => {
  const token = localStorage.getItem("authToken");

  return api.get(`/rides/driver/${driverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==============================
// GET MY RIDES (JWT + logged-in driver)
// ==============================
export const getMyRides = async () => {
  const loginData =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("loginResponse")) ||
    JSON.parse(localStorage.getItem("auth"));

  if (!loginData?.id) {
    throw new Error("Driver not logged in");
  }

  const token = localStorage.getItem("authToken");

  return api.get(`/rides/driver/${loginData.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
