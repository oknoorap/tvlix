import { FC } from "react";
import { BiTv as TVIcon } from "react-icons/bi";

import { useChannel } from "hooks/use-channel";

const ChannelTitleView: FC = () => {
  const { currentChannel } = useChannel();
  if (!currentChannel?.name) {
    return null;
  }

  return (
    <div className="flex items-center opacity-75 hover:opacity-100 invisible group-hover:visible mr-auto">
      <TVIcon className="fill-current text-white w-6 h-6 mr-2" />
      <div className="text-2xl">{currentChannel?.name}</div>
    </div>
  );
};

export default ChannelTitleView;
