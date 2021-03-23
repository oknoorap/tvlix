import { FC } from "react";
import { Box, Button, Icon } from "@chakra-ui/react";
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
      <Button
        onClick={onClick}
        display="flex"
        alignItems="center"
        rounded="full"
        textTransform="uppercase"
        visibility="hidden"
        userSelect="none"
        bg="black"
        py="2"
        px="6"
        fontSize="xl"
        opacity=".5"
        _hover={{ opacity: "1" }}
        _active={{ outline: "none" }}
        _groupHover={{ visibility: "visible" }}
      >
        <Icon as={DiceIcon} fill="current" w="6" h="6" mr="2" />
        <Box as="span" fontWeight="bold">
          Shuffle
        </Box>
      </Button>
    )
  );
};

export default VideoPlayerShuffleButton;
