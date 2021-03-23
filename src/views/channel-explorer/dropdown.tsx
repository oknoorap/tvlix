import { Flex } from "@chakra-ui/react";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import ChannelGroupBy from "./group-by";
import ChannelFilterByCategory from "./filter-by-category";
import ChannelFilterByCountry from "./filter-by-country";

const ChannelExplorerGroupDropdown = () => {
  const { groupBy } = useChannel();
  return (
    <Flex alignItems="center" ml="2" mr="auto">
      <ChannelGroupBy />
      {groupBy === EChannelGroupBy.Category && <ChannelFilterByCategory />}
      {groupBy === EChannelGroupBy.Country && <ChannelFilterByCountry />}
    </Flex>
  );
};

export default ChannelExplorerGroupDropdown;
