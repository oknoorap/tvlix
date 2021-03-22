import { Box, Heading } from "@chakra-ui/react";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";
import Country from "components/country";

import ChannelGroupItem from "./item";

const ChannelGroupList = () => {
  const { groupBy, channelList, channelGroups } = useChannel();

  return (
    <Box p="4" mt="20">
      {channelList.map((group) => {
        const title =
          groupBy === EChannelGroupBy.Country ? (
            <Country code={group} />
          ) : (
            group
          );
        return (
          <Box key={`group-${group.toLowerCase()}`} _notLast={{ mb: 10 }}>
            <Heading
              as="h2"
              color="white"
              fontSize="3xl"
              fontWeight="bold"
              borderBottom="1"
              borderBottomColor="mirage.400"
              pb="2"
              mb="6"
            >
              {title}
            </Heading>
            <ChannelGroupItem items={channelGroups[group]} />
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelGroupList;
