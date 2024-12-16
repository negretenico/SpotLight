import { axiosInstance } from "../config/axiosConfig";

const login = async ({ body }: { body: FormData }) => {
  try {
    return await axiosInstance.post("/login", body);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
const logout = () => {};
const register = async ({
  registerInformation,
}: {
  registerInformation: FormData;
}) => {
  try {
    return await axiosInstance.post("/register", registerInformation);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const QUERY_FUNCTIONS = {
  login: login,
  register: register,
};
