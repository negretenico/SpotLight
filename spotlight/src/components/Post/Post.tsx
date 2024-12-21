import { PostType } from "../../types/feed";
import Header from "./Header";
import PostContent from "./Content";
import PostFooter from "./Footer";

type PostProps = PostType & { showFooter: boolean };
export default function Post({
  username,
  createdAt,
  content,
  postId,
  commentCount,
  likeCount,
  imageUrl,
  showFooter,
}: PostProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col gap-3 p-4">
        <Header username={username} createdAt={createdAt} />
        <PostContent content={content} imageUrl={imageUrl} />
        {showFooter && (
          <PostFooter
            createdAt={createdAt}
            content={content}
            imageUrl={imageUrl}
            commentCount={commentCount}
            likeCount={likeCount}
            postId={postId}
            username={username}
          />
        )}
      </div>
    </div>
  );
}
