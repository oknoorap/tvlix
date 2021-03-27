import { Box, Icon, Link, useDisclosure } from "@chakra-ui/react";
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";

import DMCAModal from "./dmca-modal";
import InfoModal from "./info-modal";

const InfoView = () => {
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const {
    isOpen: isDMCAOpen,
    onOpen: onDMCAOpen,
    onClose: onDMCAClose,
  } = useDisclosure();
  return (
    <Box role="group">
      <Link
        mr="2"
        fontSize="sm"
        fontWeight="bold"
        visibility="hidden"
        textDecor="underline"
        _groupHover={{ visibility: "visible" }}
        onClick={onDMCAOpen}
      >
        DMCA
      </Link>
      <Icon
        as={InfoIcon}
        w="6"
        h="6"
        ml="auto"
        fill="current"
        alignSelf="flex-start"
        cursor="pointer"
        color="white"
        onClick={onInfoOpen}
      />
      <DMCAModal isOpen={isDMCAOpen} onClose={onDMCAClose} />
      <InfoModal isOpen={isInfoOpen} onClose={onInfoClose} />
    </Box>
  );
};

export default InfoView;
