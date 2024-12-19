import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../query/keys";
import { QUERY_FUNCTIONS } from "../../query/functions";
import { useAuth } from "../../hooks/useAuth";
import Posts from "../../components/Post/Posts";

export default function Feed() {
  const { token } = useAuth();
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.feed,
    queryFn: () => QUERY_FUNCTIONS.feed(token ?? ""),
  });
  return (
    <div className="grid grid-cols-6">
      <div className="col-start-2 col-span-4">
        <Posts posts={data.content} />
      </div>
    </div>
  );
}
