import { PostType } from "../../types/feed";
import Post from "./Post";
import { Nullish } from "../../types/util";

type PostsProps = { posts: Nullish<Array<PostType>>; showFooter?: boolean };
export default function Posts({ posts, showFooter = true }: PostsProps) {
  if (!posts || !posts.length) {
    return <></>;
  }
  return (
    <>
      {posts.map((post: PostType, idx) => (
        <Post key={`Post-${idx}`} {...post} showFooter={!!showFooter} />
      ))}
    </>
  );
}
