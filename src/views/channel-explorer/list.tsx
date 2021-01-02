import { useChannel } from "hooks/use-channel";

import ChannelGroupItem from "./item";

const ChannelGroupList = () => {
  const { channelGroups } = useChannel();
  const groupKeys = Object.keys(channelGroups);
  groupKeys.sort((a, z) => a.localeCompare(z));

  return (
    <div className="p-4 mt-20">
      {groupKeys.map((group, index) => (
        <div key={`group-${group.toLowerCase}`} className="mb-10 last:mb-0">
          <h2 className="text-white text-3xl font-bold border-b border-mirage-400 pb-2 mb-6">
            {group}
          </h2>
          <ChannelGroupItem items={channelGroups[group]} />
        </div>
      ))}
    </div>
  );
};

export default ChannelGroupList;
