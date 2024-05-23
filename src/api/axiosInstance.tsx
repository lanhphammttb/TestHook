import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dogapi.dog/api/v2',
  timeout: 5000 // Thiết lập thời gian timeout là 5 giây
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
);

export default axiosInstance;
