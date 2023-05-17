import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: (url: string, request?: AxiosRequestConfig<any> | undefined) =>
    baseInstance.get(url, request),
  delete: (url: string, request?: AxiosRequestConfig<any> | undefined) =>
    baseInstance.delete(url, request),
  post: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ) => baseInstance.post(url, data, config),
};

export default apiRequest;
