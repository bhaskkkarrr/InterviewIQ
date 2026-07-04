import axios from "axios";
import config from "../config/config.js";
const axiosInstance = axios.create({
  baseURL: config.AI_SERVICE_URL,
  withCredentials: true,
});

export default axiosInstance;
