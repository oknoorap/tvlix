import { useEffect } from "react";

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
    if (currentChannel?.hash) {
      setChannelId(currentChannel?.hash);
    }
  }, [currentChannel]);

  if (!isPlaying) {
    return null;
  }

  return (
    <div className="absolute bottom-0 right-0 p-4 z-20">
      <ChatList />
      <div className="relative">
        <ChatInput />
        <Settings />
      </div>
    </div>
  );
};

export default ChatView;
