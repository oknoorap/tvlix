import { Box } from "@chakra-ui/react";
import { useVideoPlayer } from "hooks/use-video-player";

const VideoMediaPlayer = () => {
  const { videoRef } = useVideoPlayer();
  return <Box ref={videoRef} as="video" autoPlay w="100%" h="100vh" />;
};

export default VideoMediaPlayer;
