import { axiosInstance } from "../config/axiosConfig";
import {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from "../types/auth";
import { Neverish } from "../types/util";
import axios, { AxiosResponse } from "axios";

const postOrError = async <ResponseBody, RequestBody>({
  request: { path, body },
  errorMsg,
}: {
  request: { path: string; body: RequestBody };
  errorMsg: string;
}): Promise<ResponseBody> => {
  try {
    const axiosResponse: AxiosResponse<ResponseBody, RequestBody> =
      await axiosInstance.post<ResponseBody>(path, body);
    return axiosResponse.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.message
      : "Unknown error";
    throw new Error(`${errorMsg}: ${errorMessage}`);
  }
};

const login = async ({
  loginRequest,
}: {
  loginRequest: LoginRequest;
}): Promise<Neverish<AuthResponse>> => {
  return postOrError<Neverish<AuthResponse>, LoginRequest>({
    request: { path: "/api/auth/login", body: loginRequest },
    errorMsg: "Issues logging in",
  });
};
const logout = async ({ logoutRequest }: { logoutRequest: LogoutRequest }) => {
  return postOrError<Neverish<String>, LogoutRequest>({
    request: { path: "/api/auth/logout", body: logoutRequest },
    errorMsg: "Issues logging out",
  });
};
const register = async ({
  registerInformation,
}: {
  registerInformation: RegisterRequest;
}): Promise<Neverish<AuthResponse>> => {
  return postOrError<Neverish<AuthResponse>, RegisterRequest>({
    request: { path: "/api/auth/register", body: registerInformation },
    errorMsg: "Issues sigining up",
  });
};

export const QUERY_FUNCTIONS = {
  login: login,
  register: register,
  logout: logout,
};
