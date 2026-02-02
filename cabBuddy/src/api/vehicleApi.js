import axiosInstance from "@/api/axiosInstance";

/**
 * Add new vehicle
 * Backend derives driver from JWT
 */
export const addVehicle = (data) => {
  return axiosInstance.post("/vehicles", data);
};


/**
 * Get vehicles of logged-in driver
 */
export const getDriverVehicles = () => {
  return axiosInstance.get("/vehicles");
};

/**
 * Update vehicle
 */
export const updateVehicle = (id, formData) => {
  return axiosInstance.put(`/vehicles/${id}`, formData);
};

/**
 * Delete vehicle
 */
export const deleteVehicle = (id) => {
  return axiosInstance.delete(`/vehicles/${id}`);
};
