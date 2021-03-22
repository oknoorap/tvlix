import { useEffect, useCallback, FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import useSound from "use-sound";
import dynamic from "next/dynamic";

import { useChannel } from "hooks/use-channel";
import { useVideoPlayer } from "hooks/use-video-player";

import MediaPlayer from "./media";
import ShuffleButton from "./shuffle-btn";
import Spinner from "./spinner";

const Chat = dynamic(() => import("views/chat"), {
  ssr: false,
});

const ChatProvider = dynamic(
  () => import("hooks/use-chat").then((mod) => mod.ChatProvider),
  {
    ssr: false,
  }
);

const CinemaViewer: FC = ({ children }) => {
  const {
    videoRef,
    loadVideo,
    isRequestReload,
    reattachVideo,
  } = useVideoPlayer();
  const { currentChannel, randomizeChannel } = useChannel();
  const [playRoll] = useSound("/dice-roll.mp3");

  // Randomize channel
  const shuffleChannel = useCallback(() => {
    playRoll();
    reattachVideo();
    randomizeChannel();
  }, [randomizeChannel]);

  // Load Video
  useEffect(() => {
    if (currentChannel) {
      loadVideo(currentChannel.url);
    }
  }, [currentChannel]);

  // Network error and request load
  useEffect(() => {
    if (isRequestReload) {
      shuffleChannel();
    }
  }, [isRequestReload, shuffleChannel]);

  return (
    <Box role="group" color="white">
      {children}

      <MediaPlayer />

      <Box position="absolute" top="0" left="0" w="100vw" h="100vh">
        <Flex w="full" h="full" alignItems="center" justifyContent="center">
          <Spinner onShuffle={shuffleChannel} />
          <ShuffleButton onClick={shuffleChannel} />
        </Flex>
      </Box>

      <ChatProvider>
        <Chat />
      </ChatProvider>
    </Box>
  );
};

export default CinemaViewer;
