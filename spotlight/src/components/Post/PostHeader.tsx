import { PostType } from "../../types/feed";

type PostHeaderProps = Pick<PostType, "username" | "createdAt">;
export default function PostHeader({ username, createdAt }: PostHeaderProps) {
  return (
    <div className={"grid grid-rows-1 grid-cols-3"}>
      <div>
        <svg
          className="h-8 w-8 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className={"font-bold"}>{username}</div>
      <div className={"font-extralight"}>{createdAt}</div>
    </div>
  );
}
