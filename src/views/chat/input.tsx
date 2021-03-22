import { useRef, useCallback, KeyboardEvent } from "react";
import { Input } from "@chakra-ui/react";

import { useChat } from "hooks/use-chat";

const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>();
  const { isConnected, sendMessage, isSettingsVisible } = useChat();

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!inputRef.current) {
        return;
      }

      if (event.key.toLowerCase() === "enter") {
        sendMessage(inputRef.current.value);
        inputRef.current.value = "";
      }
    },
    [sendMessage]
  );

  return (
    <Input
      ref={inputRef}
      disabled={!isConnected || isSettingsVisible}
      placeholder={
        !isConnected ? "Connecting to chat..." : "Press ENTER to chat"
      }
      type="text"
      shadow="dark-lg"
      outline="none"
      rounded="full"
      bgColor="white"
      color="gray.700"
      w="56"
      py="2"
      pl="4"
      pr="10"
      _placeholder={{ color: "gray.700", opacity: 0.5 }}
      _disabled={{ color: "gray.200", bgColor: "gray.500" }}
      _focus={{ outline: "none" }}
      onKeyPress={onKeyPress}
    />
  );
};

export default ChatInput;
