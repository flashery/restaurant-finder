import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const apiKey = process.env.FOURSQUARE_API_KEY || '';

  config.headers = AxiosHeaders.from({
    ...config.headers,
    Authorization: apiKey,
  });

  return config;
});

// ✅ Reusable GET
export const httpGet = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosInstance.get<T>(url, config).then((res) => res.data);
};

export const httpPost = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosInstance.post<T>(url, data, config).then((res) => res.data);
};

export const httpPut = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosInstance.put<T>(url, data, config).then((res) => res.data);
};
