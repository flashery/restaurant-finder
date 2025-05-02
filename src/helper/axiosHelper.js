import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchAnime = async (query) => {
  const response = await axios.get(`${API_URL}/anime`, {
    params: { q: query },
  });

  return response.data.data;
};

export const getAnimeById = async (id) => {
  const response = await axios.get(`${API_URL}/anime/${id}/full`);
  return response.data.data;
};
