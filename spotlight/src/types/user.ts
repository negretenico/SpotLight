import { PostType } from "./feed";
import { CommentResponse } from "./comment";

type Like = {
  id: number;
  userId: number;
  postId: number;
  commentId: number;
  createdAt: string;
};
type Follow = {
  id: number;
  followerId: number;
  followingId: number;
};
export type User = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  posts: Array<PostType>;
  comments: Array<CommentResponse>;
  likes: Array<Like>;
  followers: Array<Follow>;
  following: Array<Follow>;
};
