import { PostType } from "../../types/feed";
import Icon from "./Icon";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../../mutations/keys";
import { MUTATION_FUNCTIONS } from "../../mutations/functions";
import { useState } from "react";

type Footer = Pick<PostType, "likeCount" | "commentCount">;
export default function PostFooter({ likeCount, commentCount }: Footer) {
  const [liked, setLiked] = useState(false);
  const { mutate: updateLikesOnPost } = useMutation({
    mutationKey: MUTATION_KEYS.likePost,
    mutationFn: async () => {
      await MUTATION_FUNCTIONS.likePost();
      setLiked((prev) => !prev);
    },
  });
  return (
    <div className={"flex items-start"}>
      <div className="w-8" />
      <div className={"mr-4"}>
        <Icon
          onClick={updateLikesOnPost}
          count={likeCount}
          icon={
            <svg
              className="h-8 w-8 text-slate-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"
                fill={liked ? "#FF5733" : "none"} // Apply fill color to the heart
                stroke={liked ? "#FF5733" : "currentColor"} // Outline the heart with the same color
              />
            </svg>
          }
        />
      </div>
      <div>
        <Icon
          onClick={() => {}}
          count={commentCount}
          icon={
            <svg
              className="h-8 w-8 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
