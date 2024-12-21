import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../query/keys";
import { User } from "../../types/user";
import { UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Posts from "../../components/Post/Posts";

export default function Profile() {
  const { data: user } = useSuspenseQuery<User>({
    queryKey: QUERY_KEYS.user,
  });
  const header = () => {
    return (
      <div className={"grid grid-rows-2 grid-cols-12"}>
        <div>
          <p className={"text-lg font-semibold"}>{user.fullName}</p>
          <p className={"text-normal"}>{user.username}</p>
        </div>
        <div className={"col-start-11 col-span-2"}>
          <UserCircleIcon className={"h-16 w-16"} />
        </div>
        <div className={"flex items-center"}>
          <UserGroupIcon className={"h-8 w-8"} />
          <p>{user.followers.length} followers</p>
        </div>
      </div>
    );
  };
  return (
    <div>
      {header()}
      <hr />
      <div className={"grid grid-cols-1 gap-4"}>
        <Posts posts={user.posts} showFooter={false} />
      </div>
    </div>
  );
}
