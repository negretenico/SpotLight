import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../mutations/keys";
import { MUTATION_FUNCTIONS } from "../mutations/functions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../query/keys";
import { User } from "../types/user";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { mutate: createComment } = useMutation({
    mutationKey: MUTATION_KEYS.createPost,
    mutationFn: async (content: string) => {
      return await MUTATION_FUNCTIONS.createPost({
        request: {
          content: content,
          imageUrl: null,
        },
        options: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully uploaded post 🙌");
    },
  });
  const closeModal = () => {
    setShowModal(false);
  };
  const { data: user } = useQuery<User>({
    queryKey: QUERY_KEYS.user,
  });
  return (
    <aside className="sticky top-0 h-screen w-32 bg-gray-100 shadow-md">
      <div className="p-4">
        <h2 className="text-normal font-medium">Spotlight</h2>
        <Modal
          enabled={showModal}
          closeModal={closeModal}
          placeHolder={`What's on your mind?🤔`}
          onSubmit={createComment}
        />
        <ul className="items-center">
          <li>
            <HomeIcon
              className={
                "h-8 text-gray-400 hover:cursor-pointer hover:text-white"
              }
              onClick={() => navigate(`/`)}
            />
          </li>
          <li>
            <MagnifyingGlassIcon className={"h-8 text-gray-400"} />
          </li>
          <li>
            <PlusIcon
              onClick={() => setShowModal(true)}
              className="h-8 w-10 text-gray-100 bg-gray-400 rounded-xl hover:cursor-pointer hover:text-white"
            />
          </li>
          <li>
            <UserCircleIcon
              className={
                "h-8 text-gray-400 hover:text-white hover:cursor-pointer"
              }
              onClick={() => navigate(`/profile/${user?.username}`)}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}
