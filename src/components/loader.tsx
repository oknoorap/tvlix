import { FC } from "react";
import { Flex, Icon, keyframes } from "@chakra-ui/react";
import { ImSpinner2 as Spinner } from "react-icons/im";

type LoaderProps = {
  text: string;
};

const AnimateSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <Flex fontSize="lg">
      <Icon
        w="6"
        h="6"
        mr="2"
        fill="current"
        as={Spinner}
        animation={`${AnimateSpin} 1s linear infinite`}
      />{" "}
      {text}...
    </Flex>
  );
};

export default Loader;
