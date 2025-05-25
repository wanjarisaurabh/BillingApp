import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createRazorpayOrder = async (data) => {
  return await axios.post(`${API_URL}/payments/create-order`, data);
};

export const verifyPaymnet = async (paymentData) => {
  return await axios.post(`${API_URL}/payments/verify`, paymentData);
};


