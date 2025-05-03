import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const searchAnime = async (query: string) => {
  const response = await axios.get(`${API_URL}/anime`, {
    params: { q: query },
  });

  return response.data.data;
};

export const getAnimeById = async (id: string) => {
  const response = await axios.get(`${API_URL}/anime/${id}/full`);
  return response.data.data;
};
