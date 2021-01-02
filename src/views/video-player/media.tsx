import { useVideoPlayer } from "hooks/use-video-player";

const VideoMediaPlayer = () => {
  const { videoRef } = useVideoPlayer();
  return (
    <video
      autoPlay
      ref={videoRef}
      className="w-screen h-screen"
      style={{ width: "100%" }}
    />
  );
};

export default VideoMediaPlayer;
