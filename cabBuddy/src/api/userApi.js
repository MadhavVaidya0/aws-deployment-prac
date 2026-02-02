import api from "./axiosInstance";

// REGISTER USER
export const registerUser = (userData) => {
  return api.post("/users/register", userData);
};

// GET USER BY ID
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

// GET ALL USERS
export const getAllUsers = () => {
  return api.get("/users");
};

// UPDATE USER
export const updateUser = (userId, userData) => {
  return api.put(`/users/${userId}`, userData);
};

// GET USERS BY ROLE
export const getUsersByRole = (role) => {
  return api.get(`/users/role/${role}`);
};

// DELETE USER ✅
export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};
