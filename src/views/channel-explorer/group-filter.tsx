import { useMemo } from "react";
import slugify from "slugify";

import { useChannel } from "hooks/use-channel";

import Dropdown from "components/dropdown";

const ChannelGroupFilter = () => {
  const { groupKeys, selectedFilter, setSelectedFilter } = useChannel();

  const items = useMemo(
    () =>
      groupKeys.map((item) => ({
        id: slugify(item),
        label: item,
        isSelected: selectedFilter === item,
        onClick() {
          setSelectedFilter(item);
        },
      })),
    [groupKeys, selectedFilter]
  );

  return <Dropdown selectLabel={selectedFilter} items={items} grid={3} />;
};

export default ChannelGroupFilter;
