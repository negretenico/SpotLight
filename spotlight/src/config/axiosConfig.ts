import axios from "axios";

const createInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 60000, // Set timeout to 60 seconds
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*", // Allow CORS
    },
  });
};
// TODO: maybe but this in an env
export const axiosInstance = createInstance("http://localhost:8080");
