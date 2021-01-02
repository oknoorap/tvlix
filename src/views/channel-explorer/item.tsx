import { FC } from "react";

import { useChannel, Channel, EChannelGroupBy } from "hooks/use-channel";
import Image from "components/image";

type ChannelGroupItem = {
  items: Channel[];
};

const ChannelGroupItem: FC<ChannelGroupItem> = ({ items }) => {
  const { groupBy } = useChannel();
  return (
    <div className="grid grid-cols-5 gap-x-5 gap-y-5">
      {items.map((item, index) => (
        <div className="relative group" key={`slider-${index}`}>
          <Image src={item.logo} className="w-full h-auto max-h-32" alt="" />
          <div className="absolute top-0 left-0 w-full h-full bg-mirage-500 bg-opacity-75 z-10" />
          <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center z-10">
            <div className="text-gray-300 group-hover:text-white font-bold text-xl text-center flex flex-col">
              <div className="">{item.name}</div>
              <div className="text-sm">
                {groupBy === EChannelGroupBy.Category
                  ? item.country
                  : item.group}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelGroupItem;
