import { Nullish } from "./util";

export type LoginRequest = { username: string; password: string };
export type RegisterRequest = LoginRequest & {
  email: string;
  username: string;
};
export type LogoutRequest = { accessToken: string };
export type AuthResponse = { accessToken: string; error: Nullish<string> }; // TODO: this will likely evolve into more later on
