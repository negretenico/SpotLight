import { ReactElement, useRef, useState } from "react";

type PostIconProps = {
  onClick: any;
  count: number;
  icon: ReactElement;
};
export default function Icon({ count, onClick, icon }: PostIconProps) {
  const [localCount, setLocalCount] = useState<number>(count);
  const isClicked = useRef<boolean>(false);
  const handleClick = () => {
    onClick();
    const delta = isClicked.current ? -1 : 1;
    setLocalCount((prevState) => prevState + delta);
    isClicked.current = !isClicked.current;
  };
  return (
    <div
      onClick={handleClick}
      className={"flex items-start  hover:bg-light_grey hover:rounded-lg"}
    >
      {icon}
      <p className={"font-normal"}>{localCount}</p>
    </div>
  );
}
