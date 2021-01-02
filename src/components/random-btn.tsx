import { FC } from "react";
import { GrRotateRight as RandomIcon } from "react-icons/gr";

type RandomIconProps = {
  onClick?: () => void;
};

const RandomButton: FC<RandomIconProps> = ({ onClick }) => {
  return (
    <RandomIcon className="fill-current ml-1 select-none" onClick={onClick} />
  );
};

export default RandomButton;
