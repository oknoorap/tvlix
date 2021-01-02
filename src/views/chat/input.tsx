import { useRef, useCallback, KeyboardEvent } from "react";

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
    <input
      ref={inputRef}
      disabled={!isConnected || isSettingsVisible}
      type="text"
      placeholder={!isConnected ? "Connecting to chat..." : "Enter to chat"}
      className="shadow-xl outline-none w-56 rounded-full bg-white text-gray-500 py-2 pl-4 pr-10 placeholder-gray-400 placeholder-opacity-50 disabled:bg-gray-500"
      onKeyPress={onKeyPress}
    />
  );
};

export default ChatInput;
