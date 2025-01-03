import { Nullish } from "./util";

export type PostType = {
  content: string;
  postId: number;
  username: string;
  createdAt: string;
  imageUrl: Nullish<string>;
  commentCount: number;
  likeCount: number;
};
type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};
type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type FeedResponse = {
  content?: Nullish<Array<PostType>>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
export type FeedRequest = any;
