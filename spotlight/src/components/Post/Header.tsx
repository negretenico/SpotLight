import { PostType } from "../../types/feed";

type PostHeaderProps = Partial<Pick<PostType, "username" | "createdAt">>;
export default function Header({ username, createdAt }: PostHeaderProps) {
  const formatTime = (createdAt: string) => {
    const timeUnits: [number, string][] = [
      [1000, "sec"],
      [1000 * 60, "min"],
      [1000 * 60 * 60, "hr"],
      [1000 * 60 * 60 * 24, "day"],
      [1000 * 60 * 60 * 24 * 7, "week"],
      [1000 * 60 * 60 * 24 * 30, "month"],
      [1000 * 60 * 60 * 24 * 365, "year"],
    ];
    const createdAtTime = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const delta = now - createdAtTime;
    if (delta < 0) {
      return `Time ${createdAt} is in the future`;
    }
    for (const [unit, label] of timeUnits.reverse()) {
      const elapsedTime = Math.floor(delta / unit);
      if (elapsedTime > 0) {
        return `${elapsedTime}${label}`;
      }
    }
    return "now";
  };
  return (
    <div className="flex items-center gap-3">
      <div className="w-8">
        <svg
          className="h-8 w-8 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <div className="font-semibold">{username}</div>
        <div className="font-normal">
          {createdAt ? formatTime(createdAt) : ""}
        </div>
      </div>
    </div>
  );
}
