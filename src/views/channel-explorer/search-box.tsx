import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { BiSearch as SearchIcon } from "react-icons/bi";

const ChannelSearchBox = () => {
  return (
    <Box position="relative" ml="4" mr="0" w="50%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={SearchIcon} color="gray.500" />}
        />
        <Input
          w="full"
          py="2"
          px="5"
          type="search"
          rounded="full"
          bgColor="white"
          color="mirage.500"
          placeholder="Search channels"
          _focus={{ outline: "none" }}
          _placeholder={{ color: "gray.500" }}
          _disabled={{ bg: "gray.300" }}
        />
      </InputGroup>
    </Box>
  );
};

export default ChannelSearchBox;
