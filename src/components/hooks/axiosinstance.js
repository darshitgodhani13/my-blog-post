import axios from "axios";
import {baseURL} from "../config/configJson";

const BACKEND_URL = baseURL;

const axiosInstanceAuth = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstanceAuth.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstanceAuth;
