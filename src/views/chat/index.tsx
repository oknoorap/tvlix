import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useVideoPlayer } from "hooks/use-video-player";
import { useChannel } from "hooks/use-channel";
import { useChat } from "hooks/use-chat";

import ChatList from "./list";
import ChatInput from "./input";
import Settings from "./settings";

const ChatView = () => {
  const { currentChannel } = useChannel();
  const { isPlaying } = useVideoPlayer();
  const { setChannelId } = useChat();

  useEffect(() => {
    if (currentChannel?.link) {
      setChannelId(currentChannel?.link);
    }
  }, [currentChannel]);

  if (!isPlaying) {
    return null;
  }

  return (
    <Box position="absolute" right="0" bottom="0" p="4" zIndex="20">
      <ChatList />
      <Box position="relative">
        <ChatInput />
        <Settings />
      </Box>
    </Box>
  );
};

export default ChatView;
