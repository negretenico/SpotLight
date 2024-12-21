import { PostType } from "../../types/feed";
import Post from "./Post";
import { Nullish } from "../../types/util";

type PostsProps = { posts: Nullish<Array<PostType>> };
export default function Posts({ posts }: PostsProps) {
  if (!posts || !posts.length) {
    return <></>;
  }
  return (
    <>
      {posts.map((post: PostType, idx) => (
        <Post key={`Post-${idx}`} {...post} />
      ))}
    </>
  );
}
