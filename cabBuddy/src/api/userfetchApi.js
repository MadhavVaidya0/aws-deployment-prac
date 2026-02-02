import axiosInstance from "./axiosInstance";
import { getCurrentUserId } from "../config/auth";

export const fetchUserById = () => {
  const userId = getCurrentUserId();
  return axiosInstance.get(`/users/${userId}`);
};



// export const updateUserProfile = (data) => {
//   const userId = getCurrentUserId();
//   return axiosInstance.put(`/users/${userId}`, data);
// };

export const updateUserProfile = (userId, payload) => {
  return axiosInstance.put(`/users/${userId}`, payload);
};
