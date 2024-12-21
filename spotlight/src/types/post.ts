import { PostType } from "./feed";
import { Nullish } from "./util";

export type CreatePostRequest = {
  content: Nullish<string>;
  imageUrl: Nullish<string>;
};
export type CreatePostResponse = PostType;
