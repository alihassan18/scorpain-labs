import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import * as Cookies from "js-cookie";

// Function to create Axios instance with dynamic authorization header
const createAxiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_PATH ||
      "https://artofyolo-sta-b7ae75573837.herokuapp.com",
    headers: {
      "Content-type": "application/json",
      authorization: getAuthorizationHeader(),
    },
  });

  // Function to get authorization header with access token from cookies
  function getAuthorizationHeader() {
    const accessToken = Cookies.default.get("access_token");
    if (accessToken) {
      return `Bearer ${accessToken}`;
    }
    return ""; // Return empty string if no access token found
  }

  // Function to update authorization header dynamically
  function updateAuthorizationHeader() {
    instance.defaults.headers.authorization = getAuthorizationHeader();
  }

  // Add a request interceptor to update authorization header before each request
  instance.interceptors.request.use(
    (config) => {
      // Update authorization header if access token changes
      updateAuthorizationHeader();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle 403 Forbidden errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Do something with the response data
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 403) {
        // Handle the 403 error here (e.g., token expired or unauthorized)
        console.log("403 Forbidden Error:", error.response.data);
        // Optionally handle token refresh or logout
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
