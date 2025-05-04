import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach authorization headers dynamically
axiosInstance.interceptors.request.use((config) => {
  const apiKey = process.env.FOURSQUARE_API_KEY;
  config.headers = AxiosHeaders.from({
    ...config.headers,
    Authorization: apiKey || '',
  });

  return config;
});

export const httpGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

export const httpPost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

export const httpPut = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};
