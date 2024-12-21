import { axiosInstance } from "../config/axiosConfig";
import { FeedRequest, FeedResponse } from "../types/feed";
import { AxiosResponse } from "axios";
import { User } from "../types/user";

const feed = async (token: string) => {
  const params = new URLSearchParams({
    page: "0",
    size: "10",
    sort: "createdAt",
  });
  try {
    const resp: AxiosResponse<FeedRequest, FeedResponse> =
      await axiosInstance.get("/api/feed", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
    return resp.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
const user = async (token: string) => {
  try {
    const resp: AxiosResponse<User, any> = await axiosInstance.get(
      "/api/user",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return resp.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
export const QUERY_FUNCTIONS = {
  feed: (token: string) => feed(token),
  user: (token: string) => user(token),
};
