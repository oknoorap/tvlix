import { Flex } from "@chakra-ui/react";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import ChannelGroupBy from "./group-by";
import ChannelFilterByCategory from "./filter-by-category";

const ChannelExplorerGroupDropdown = () => {
  const { groupBy } = useChannel();
  return (
    <Flex alignItems="center" ml="2" mr="auto">
      <ChannelGroupBy />
      {groupBy === EChannelGroupBy.Category && <ChannelFilterByCategory />}
    </Flex>
  );
};

export default ChannelExplorerGroupDropdown;
