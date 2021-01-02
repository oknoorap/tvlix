import { useMemo } from "react";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";
import Country from "components/country";

import ChannelGroupItem from "./item";

const ChannelGroupList = () => {
  const { groupKeys, channelGroups, groupBy, selectedFilter } = useChannel();
  const isGroupByCountry = groupBy === EChannelGroupBy.Country;
  const groups = useMemo(
    () =>
      isGroupByCountry
        ? groupKeys
        : groupKeys
            .slice(1, groupKeys.length)
            .filter((item) =>
              selectedFilter === "All" ? true : item === selectedFilter
            ),
    [groupKeys, selectedFilter]
  );

  return (
    <div className="p-4 mt-20">
      {groups.map((group) => {
        const title = isGroupByCountry ? <Country code={group} /> : group;
        return (
          <div key={`group-${group.toLowerCase()}`} className="mb-10 last:mb-0">
            <h2 className="text-white text-3xl font-bold border-b border-mirage-400 pb-2 mb-6">
              {title}
            </h2>
            <ChannelGroupItem items={channelGroups[group]} />
          </div>
        );
      })}
    </div>
  );
};

export default ChannelGroupList;
