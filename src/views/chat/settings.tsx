import { Flex, Box, Icon, IconButton } from "@chakra-ui/react";
import {
  BsFillGearFill as SettingsIcon,
  BsFillPersonFill as PersonIcon,
  BsChat as ChatIcon,
} from "react-icons/bs";
import {
  MdColorLens as ColorIcon,
  MdInsertEmoticon as CharIcon,
} from "react-icons/md";

import { useChat } from "hooks/use-chat";
import RandomButton from "components/random-btn";

const ChatSettingsButton = () => {
  const {
    username,
    color,
    char,
    isSettingsVisible,
    setSettingsVisibility,
    randomUsername,
    randomColor,
    randomChar,
  } = useChat();
  return (
    <>
      {isSettingsVisible && (
        <Box
          position="absolute"
          left="0"
          bottom="0"
          w="full"
          mb="12"
          bgColor="white"
          rounded="lg"
          shadow="2xl"
        >
          <Box p="4" color="gray.600">
            <Flex alignItems="center" mb="2" fontWeight="bold">
              <Icon as={ChatIcon} fill="current" mr="2" />
              <Box as="span" color="gray.800">
                Chat Settings
              </Box>
            </Flex>
            <Box mb="2" fontSize="sm">
              <Flex alignItems="center" fontWeight="bold">
                <Icon as={PersonIcon} fill="current" mr="1" />
                <Box as="span">username</Box>
              </Flex>
              <Flex alignItems="center">
                <Box as="span" fontSize="xs">
                  {username}
                </Box>
                <RandomButton onClick={randomUsername} />
              </Flex>
            </Box>
            <Box mb="2" fontSize="sm">
              <Flex fontWeight="bold" alignItems="center">
                <Icon as={ColorIcon} fill="current" mr="1" />
                <Box as="span">color</Box>
              </Flex>
              <Flex alignItems="center">
                <Box
                  w="4"
                  h="4"
                  border="1"
                  borderColor="gray.500"
                  bgColor={color}
                />
                <Icon as={RandomButton} onClick={randomColor} />
              </Flex>
            </Box>
            <Box fontSize="sm">
              <Flex alignItems="center" fontWeight="bold">
                <Icon as={CharIcon} fill="current" mr="1" />
                <Box as="span">character</Box>
              </Flex>
              <Flex alignItems="center">
                <Box as="span">{char}</Box>
                <Icon as={RandomButton} onClick={randomChar} />
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
      <IconButton
        as={SettingsIcon}
        aria-label="Settings"
        color={!isSettingsVisible ? "gray.600" : "white"}
        fill="current"
        position="absolute"
        transform="translateY(-50%)"
        cursor="pointer"
        top="50%"
        right="0"
        bg="none"
        size="sm"
        p="2"
        mr="1"
        _focus={{ outline: "none" }}
        _active={{ outline: "none" }}
        _hover={{ bg: "none" }}
        onClick={() => setSettingsVisibility((isVisible) => !isVisible)}
      />
    </>
  );
};

export default ChatSettingsButton;
