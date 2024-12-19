import { PostType } from "../../types/feed";
import Post from "./Post";
import { Nullish } from "../../types/util";

type PostsProps = { posts: Nullish<Array<PostType>> };
export default function Posts({ posts }: PostsProps) {
  if (!posts || !posts.length) {
    return <></>;
  }
  debugger;
  return (
    <div>
      {posts.map((post: PostType, idx) => (
        <Post key={`Post-${idx}`} {...post} />
      ))}
    </div>
  );
}
