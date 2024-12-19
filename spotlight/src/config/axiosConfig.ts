import axios from "axios";

const createPublicInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 60000, // Set timeout to 60 seconds
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};
// TODO: maybe but this in an env
export const axiosInstance = createPublicInstance("http://localhost:8080");
