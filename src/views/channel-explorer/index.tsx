import { FC } from "react";

import ChannelList from "views/channel-explorer/list";

const ChannelExplorer: FC = ({ children }) => {
  return (
    <div className="group text-white z-50">
      {children}

      <ChannelList />
    </div>
  );
};

export default ChannelExplorer;
