export type CommentRequest = {
  content: string;
  postId: number;
};
export type CommentResponse = {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
};
