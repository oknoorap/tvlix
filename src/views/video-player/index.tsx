import { useEffect, useCallback, FC } from "react";
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
    <div className="group text-white">
      {children}

      <MediaPlayer />

      <div className="absolute top-0 left-0 w-screen h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <Spinner onShuffle={shuffleChannel} />
          <ShuffleButton onClick={shuffleChannel} />
        </div>
      </div>

      <ChatProvider>
        <Chat />
      </ChatProvider>
    </div>
  );
};

export default CinemaViewer;
