import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_API_URL,
});
