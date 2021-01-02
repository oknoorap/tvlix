import { FC } from "react";
import { GiDiceSixFacesFive as DiceIcon } from "react-icons/gi";

import { useVideoPlayer } from "hooks/use-video-player";
import Loader from "components/loader";

type VideoPlayerSpinnerProps = {
  onShuffle?: () => void;
};

const VideoPlayerSpinner: FC<VideoPlayerSpinnerProps> = ({ onShuffle }) => {
  const { isVideoReady, isVideoLoading } = useVideoPlayer();

  return (
    (!isVideoReady || isVideoLoading) && (
      <div className="flex items-center flex-col">
        {!isVideoReady && <Loader text="Loading" />}
        {isVideoLoading && <Loader text="Streaming" />}

        <div className="text-xs mt-2">
          <span className="mr-1">Wait too long?</span>
          <a
            className="font-bold underline cursor-pointer uppercase inline-flex items-baseline mr-1"
            onClick={onShuffle}
          >
            <DiceIcon className="flex-shrink-0 fill-current text-white w-2 h-2 mr-1" />
            <span>shuffle</span>
          </a>
          <span>channel!</span>
        </div>
      </div>
    )
  );
};

export default VideoPlayerSpinner;
