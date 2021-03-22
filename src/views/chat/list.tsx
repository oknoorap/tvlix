import { Box } from "@chakra-ui/react";

import { useChat } from "hooks/use-chat";

const ChatList = () => {
  const { chats } = useChat();

  return (
    <Box w="56" mb="4">
      {chats.map(({ username, char, color, message }, index) => {
        const opacity =
          chats.length > 7
            ? index === 4
              ? 0.8
              : index === 3
              ? 0.7
              : index === 2
              ? 0.5
              : index === 1
              ? 0.4
              : index === 0
              ? 0.1
              : null
            : {};

        return (
          <Box
            key={`chat-${index}`}
            color="white"
            lineHeight="shorter"
            userSelect={index >= 1 ? "none" : null}
            textShadow="darker"
            opacity={opacity}
          >
            <Box as="span" mr="2" fontSize="sm">
              <Box as="span" mr="1">
                {char}
              </Box>
              <Box as="strong" color={color}>
                {username}
              </Box>
            </Box>
            <Box as="span" fontSize="xs">
              {message}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatList;
