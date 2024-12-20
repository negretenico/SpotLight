import { PostType } from "../../types/feed";
import Header from "./Header";
import PostContent from "./Content";
import PostFooter from "./Footer";

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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col gap-3 p-4">
        <Header username={username} createdAt={createdAt} />
        <PostContent content={content} imageUrl={imageUrl} />
        <PostFooter commentCount={commentCount} likeCount={likeCount} />
      </div>
    </div>
  );
}
