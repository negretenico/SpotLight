import { axiosInstance } from "../config/axiosConfig";
import { FeedRequest, FeedResponse } from "../types/feed";

const feed = async (token: string) => {
  const params = new URLSearchParams({
    page: "0",
    size: "10",
    sort: "createdAt",
  });
  try {
    const resp: FeedResponse = await axiosInstance.get<
      FeedRequest,
      FeedResponse
    >("/api/feed", { params, headers: { Authorization: `Bearer ${token}` } });
    return resp;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
export const QUERY_FUNCTIONS = {
  feed: (token: string) => feed(token),
};
