import axios from "./axiosInstance";

export const createPaymentIntent = (data) =>
  axios.post("/payments/create-intent", data);
