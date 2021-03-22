import { Box, Icon, useDisclosure } from "@chakra-ui/react";
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";

import InfoModal from "./modal";

const InfoView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Icon
        as={InfoIcon}
        w="6"
        h="6"
        ml="auto"
        fill="current"
        alignSelf="flex-start"
        cursor="pointer"
        color="white"
        onClick={onOpen}
      />
      <InfoModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default InfoView;
