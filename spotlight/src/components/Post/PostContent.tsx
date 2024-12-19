import { PostType } from "../../types/feed";

type PostContent = Pick<PostType, "content" | "imageUrl">;
export default function PostContent({ content, imageUrl }: PostContent) {
  // TODO: add the images from either s3 or local depending on the env.
  return (
    <div className={"grid grid-cols-1"}>
      {imageUrl && <div className={"post-image"}>{imageUrl}</div>}
      <div className={"font-mono"}>{content}</div>
    </div>
  );
}
