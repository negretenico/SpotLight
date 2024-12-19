import { PostType } from "../../types/feed";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

type PostProps = Omit<PostType, "postId">;
export default function Post({
  username,
  createdAt,
  content,
  commentCount,
  likeCount,
  imageUrl,
}: PostProps) {
  return (
    <div>
      <PostHeader username={username} createdAt={createdAt} />
      <PostContent content={content} imageUrl={imageUrl} />
      <PostFooter commentCount={commentCount} likeCount={likeCount} />
    </div>
  );
}
