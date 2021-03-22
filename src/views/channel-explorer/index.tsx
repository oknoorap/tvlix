import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { useChannel } from "hooks/use-channel";

import ChannelList from "views/channel-explorer/list";

const ChannelExplorer: FC = ({ children }) => {
  const { isChannelLoaded } = useChannel();
  return (
    <Box color="white" zIndex="50">
      {children}

      {isChannelLoaded && <ChannelList />}
    </Box>
  );
};

export default ChannelExplorer;
