type Like = {
  postId: number;
};
export type LikeRequest = {
  liked: boolean;
  like: Like;
};
export type LikeResponse = string;
