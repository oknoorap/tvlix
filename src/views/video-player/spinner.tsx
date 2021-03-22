import { FC } from "react";
import { Box, Flex, Link, Icon } from "@chakra-ui/react";
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
      <Flex alignItems="center" flexDir="column">
        {!isVideoReady && <Loader text="Loading" />}
        {isVideoLoading && <Loader text="Streaming" />}

        <Box fontSize="xs" mt="2">
          <Box as="span" mr="1">
            Wait too long?
          </Box>
          <Link
            fontWeight="bold"
            textDecor="underline"
            cursor="pointer"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="baseline"
            mr="1"
            onClick={onShuffle}
          >
            <Icon
              as={DiceIcon}
              flexShrink={[0]}
              fill="current"
              color="white"
              w="2"
              h="2"
              mr="1"
            />
            <Box as="span">shuffle</Box>
          </Link>
          <Box as="span">channel!</Box>
        </Box>
      </Flex>
    )
  );
};

export default VideoPlayerSpinner;
