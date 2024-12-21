import Header from "./Post/Header";
import PostContent from "./Post/Content";
import { PostType } from "../types/feed";
import { useRef, useState } from "react";

type ModalProps = {
  enabled: boolean;
  closeModal: () => void;
  onSubmit: (content: string) => void;
  title?: string;
  placeHolder?: string;
  post?: Pick<PostType, "username" | "createdAt" | "content" | "imageUrl">;
};
export default function Modal({
  enabled,
  closeModal,
  title,
  onSubmit,
  placeHolder,
  post,
}: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  if (!enabled) return <></>;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const replyText = inputRef.current?.value?.trim() || "";
    if (replyText) {
      onSubmit(replyText);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      closeModal();
    }
  };
  const { username, createdAt, content, imageUrl } = post ?? {};
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={closeModal}
      />
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="grid grid-cols-12 gap-4">
              <a
                onClick={closeModal}
                className="no-underline text-gray-600 hover:text-gray-800 transition-colors hover:no-underline hover:cursor-pointer"
              >
                Cancel
              </a>
              <div className={"col-start-6 col-span-6"}>
                <h4 className="text-lg font-medium text-gray-800">
                  {title ?? "Reply"}
                </h4>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-4">
            {content && (
              <div className="mt-4">
                <Header username={username} createdAt={createdAt} />
                <PostContent content={content} imageUrl={imageUrl} />
              </div>
            )}
            <div className="mt-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <svg
                  className="h-8 w-8 text-slate-500 flex-shrink-0"
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
                <div className="flex-grow relative">
                  <input
                    ref={inputRef}
                    placeholder={placeHolder ?? `Reply to ${username}`}
                    onChange={(e) => setIsActive(!!e.target.value?.trim())}
                    className="w-full p-2 pr-24 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {isActive && (
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm rounded-3xl hover:bg-blue-600 transition-colors"
                    >
                      👆
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
