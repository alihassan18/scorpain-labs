import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import * as Cookies from 'js-cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
  headers: {
    "Content-type": "application/json"
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    const access_token = Cookies.default.get('access_token');
    if (access_token && config?.headers) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    } else {
      // Handle the case when there is no token
      console.error('No token available');
      // Optionally cancel the request here
      // return Promise.reject('No token');
    }
    return config;
  },
  (error: AxiosError) => {
    return error;
  }
);

// Add a response interceptor 
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with the response data
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      // Handle the 403 error here
      console.log('403 Forbidden Error:', error.response.data);
      //localStorage.removeItem('token');
      //localStorage.removeItem('user');

      /* Replace this with actual request to redirect in reactjs on router level */
      // location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
