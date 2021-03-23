import { Box, Heading, Icon } from "@chakra-ui/react";
import Flag from "react-country-flag";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import ChannelGroupItem from "./item";

const ChannelGroupList = () => {
  const { groupBy, channelGroups, channelGroupBy, countries } = useChannel();

  return (
    <Box p="4" mt="20">
      {channelGroups.map((group) => {
        const items = channelGroupBy[group];
        const groupByCategory = groupBy === EChannelGroupBy.Category;
        let { code = group, country = group, flag = false } =
          (!groupByCategory && countries.find((item) => item.code === group)) ||
          {};

        const title = groupByCategory ? (
          group
        ) : (
          <Box as="span" display="inline-flex" lineHeight="none">
            {flag && (
              <Icon svg as={Flag} countryCode={code} title={country} mr="2" />
            )}
            <Box as="span">{country}</Box>
          </Box>
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
            <ChannelGroupItem items={items} />
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelGroupList;
