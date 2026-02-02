import api from "./axiosInstance";

export const getAdminStats = () => api.get("/admin/stats");
export const getAdminBookings = () => api.get("/admin/bookings");
