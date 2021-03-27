import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { BiSearch as SearchIcon } from "react-icons/bi";
import { DebounceInput } from "react-debounce-input";

import { useChannel } from "hooks/use-channel";

const ChannelSearchBox = () => {
  const { search } = useChannel();
  return (
    <Box position="relative" ml="4" mr="0" w="50%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={SearchIcon} color="gray.500" />}
        />
        <Input
          as={DebounceInput}
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
          // @ts-ignore
          debounceTimeout={300}
          onChange={(event) => search(event.target.value)}
        />
      </InputGroup>
    </Box>
  );
};

export default ChannelSearchBox;
