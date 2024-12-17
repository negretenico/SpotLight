import { axiosInstance } from "../config/axiosConfig";
import {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from "../types/auth";
import { Neverish } from "../types/util";

const postOrError = async <T>({
  request: { path, body },
  errorMsg,
}: {
  request: { path: string; body: any };
  errorMsg: string;
}): Promise<T> => {
  try {
    return await axiosInstance.post(path, body);
  } catch (error) {
    throw new Error(errorMsg);
  }
};

const login = async ({
  loginRequest,
}: {
  loginRequest: LoginRequest;
}): Promise<Neverish<AuthResponse>> => {
  return postOrError<Neverish<AuthResponse>>({
    request: { path: "/api/auth/login", body: loginRequest },
    errorMsg: "Issues logging in",
  });
};
const logout = async ({ logoutRequest }: { logoutRequest: LogoutRequest }) => {
  return postOrError<Neverish<String>>({
    request: { path: "/api/auth/logout", body: logoutRequest },
    errorMsg: "Issues logging out",
  });
};
const register = async ({
  registerInformation,
}: {
  registerInformation: RegisterRequest;
}): Promise<Neverish<AuthResponse>> => {
  return postOrError<Neverish<AuthResponse>>({
    request: { path: "/api/auth/register", body: registerInformation },
    errorMsg: "Issues sigining up",
  });
};

export const QUERY_FUNCTIONS = {
  login: login,
  register: register,
  logout: logout,
};
