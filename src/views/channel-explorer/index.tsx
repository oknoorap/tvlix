import { FC } from "react";

import { useChannel } from "hooks/use-channel";

import ChannelList from "views/channel-explorer/list";

const ChannelExplorer: FC = ({ children }) => {
  const { isChannelLoaded } = useChannel();
  return (
    <div className="text-white z-50">
      {children}

      {isChannelLoaded && <ChannelList />}
    </div>
  );
};

export default ChannelExplorer;
