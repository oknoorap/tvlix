import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import Dropdown from "components/dropdown";

const ChannelGroupByDropdown = () => {
  const { channelGroups, groupBy, setGroupBy } = useChannel();
  const dropdowns = [
    {
      id: "country",
      label: "Country",
      isSelected: groupBy === EChannelGroupBy.Country,
      onClick() {
        setGroupBy(EChannelGroupBy.Country);
      },
    },

    {
      id: "category",
      label: "Categories",
      isSelected: groupBy === EChannelGroupBy.Category,
      onClick() {
        setGroupBy(EChannelGroupBy.Category);
      },
    },
  ];

  return <Dropdown selectLabel="Group By" items={dropdowns} />;
};

export default ChannelGroupByDropdown;
