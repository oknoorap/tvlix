import { FC } from "react";
import Link from "next/link";

import useIntersection from "hooks/use-intersection";
import { useChannel, Channel, EChannelGroupBy } from "hooks/use-channel";
import Image from "components/image";
import Country from "components/country";

type ChannelGroupItem = {
  items: Channel[];
};

const ChannelGroupItem: FC<ChannelGroupItem> = ({ items }) => {
  const { ref, isRender } = useIntersection();
  const { groupBy } = useChannel();
  const imagePlaceholder = require("../../../public/channel.png?url");
  return (
    <div className="grid grid-cols-5 gap-x-5 gap-y-5" ref={ref}>
      {isRender &&
        items.map((item, index) => (
          <div className="relative group" key={`slider-${index}`}>
            <Image
              src={item.logo || imagePlaceholder}
              placeholderSrc={imagePlaceholder}
              className="w-full h-auto min-h-full max-h-32"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-mirage-500 bg-opacity-75 group-hover:bg-opacity-100 group-hover:bg-mirage-400 transition-opacity z-10" />
            <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center z-10">
              <Link href={`/watch/${item.link}`} passHref>
                <a className="text-gray-400 group-hover:text-white text-xl text-center flex flex-col items-center">
                  <span className="w-2/3 block font-bold whitespace-no-wrap leading-tight mb-2">
                    {item.name}
                  </span>
                  <span className="block text-sm">
                    {groupBy === EChannelGroupBy.Category ? (
                      <Country code={item.country} />
                    ) : (
                      item.group
                    )}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChannelGroupItem;
