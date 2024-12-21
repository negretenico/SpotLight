import { axiosInstance } from "../config/axiosConfig";
import {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from "../types/auth";
import { Neverish } from "../types/util";
import axios, { AxiosResponse } from "axios";
import { LikeRequest, LikeResponse } from "../types/like";
import { CommentRequest, CommentResponse } from "../types/comment";
import { CreatePostRequest, CreatePostResponse } from "../types/post";

const postOrError = async <ResponseBody, RequestBody>({
  request: { path, body, options },
  errorMsg,
}: {
  request: { path: string; body: RequestBody; options?: any };
  errorMsg: string;
}): Promise<ResponseBody> => {
  try {
    const axiosResponse: AxiosResponse<ResponseBody, RequestBody> =
      await axiosInstance.post<ResponseBody>(path, body, options);
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
const updateLikesOnPost = async ({
  likeRequest,
  options,
}: {
  likeRequest: LikeRequest;
  options: any;
}): Promise<Neverish<LikeResponse>> => {
  return postOrError<Neverish<LikeResponse>, LikeRequest>({
    request: { path: "/api/like", body: likeRequest, options: options },
    errorMsg: `Issue liking post with id  ${likeRequest.like.postId}`,
  });
};
const addComment = async ({
  request,
  options,
}: {
  request: CommentRequest;
  options: any;
}) => {
  return postOrError<Neverish<CommentResponse>, CommentRequest>({
    request: { path: "/api/comment", body: request, options: options },
    errorMsg: `Issue liking post with id  ${request.postId}`,
  });
};
const createPost = async ({
  request,
  options,
}: {
  request: CreatePostRequest;
  options: any;
}) => {
  return postOrError<Neverish<CreatePostResponse>, CreatePostRequest>({
    request: { path: "/api/post", body: request, options: options },
    errorMsg: `Issue creating post`,
  });
};
export const MUTATION_FUNCTIONS = {
  login: login,
  register: register,
  logout: logout,
  likePost: updateLikesOnPost,
  dislikePost: updateLikesOnPost,
  addComment: addComment,
  createPost: createPost,
};
