import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const searchRestaurant = async (message: string) => {
  const response = await axios.post(`${API_URL}/execute`, {
    message,
  });

  return response.data;
};