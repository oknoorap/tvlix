import { FC } from "react";
import { Icon } from "@chakra-ui/react";
import { GrRotateRight as RandomIcon } from "react-icons/gr";

type RandomIconProps = {
  onClick?: () => void;
};

const RandomButton: FC<RandomIconProps> = ({ onClick }) => {
  return (
    <Icon
      as={RandomIcon}
      fill="current"
      ml="1"
      userSelect="none"
      onClick={onClick}
    />
  );
};

export default RandomButton;
