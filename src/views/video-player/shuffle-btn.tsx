import { FC } from "react";
import { GiDiceSixFacesFive as DiceIcon } from "react-icons/gi";

import { useVideoPlayer } from "hooks/use-video-player";

type VideoPlayerShuffleButtonProps = {
  onClick?: () => void;
};

const VideoPlayerShuffleButton: FC<VideoPlayerShuffleButtonProps> = ({
  onClick,
}) => {
  const { isPlaying } = useVideoPlayer();

  return (
    isPlaying && (
      <button
        onClick={onClick}
        className="flex items-center rounded-full bg-black bg-opacity-75 py-2 px-6 text-xl opacity-50 hover:opacity-100 active:outline-none uppercase invisible group-hover:visible select-none"
      >
        <DiceIcon className="fill-current w-6 h-6 mr-2" />
        <span className="font-bold">Shuffle</span>
      </button>
    )
  );
};

export default VideoPlayerShuffleButton;
