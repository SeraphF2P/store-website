import axios from "axios";
import { host } from "../host";

const axiosClient = axios.create({
  baseURL: host + "/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token || ""}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      // localStorage.removeItem("token");
      window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
