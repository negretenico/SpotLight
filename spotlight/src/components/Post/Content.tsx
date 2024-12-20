import { PostType } from "../../types/feed";

type Content = Pick<PostType, "content" | "imageUrl">;
export default function PostContent({ content, imageUrl }: Content) {
  const getImage = (path: string) => {
    return `http://localhost:8080${path}`;
  };
  return (
    <div>
      <div className="flex items-start mb-3">
        <div className="w-8" />
        <div className="ml-3 flex-1">
          <div className="font-mono">{content}</div>
        </div>
      </div>
      {imageUrl && (
        <div className="flex items-start">
          <div className="w-8" />
          <div className="mt-3 px-4 flex-1">
            <img
              alt={imageUrl}
              src={getImage(imageUrl)}
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
