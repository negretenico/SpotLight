import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../query/keys";
import { QUERY_FUNCTIONS } from "../../query/functions";
import { useAuth } from "../../hooks/useAuth";

export default function Feed() {
  const { token } = useAuth();
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.feed,
    queryFn: () => QUERY_FUNCTIONS.feed(token ?? ""),
  });
  return <>Feed</>;
}
