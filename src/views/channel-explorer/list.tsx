import { Box, Heading, Icon } from "@chakra-ui/react";
import Flag from "react-country-flag";

import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import ChannelGroupItem from "./item";
import ChannelItemSearchLoader from "./item-search-loader";

const ChannelGroupList = () => {
  const {
    groupBy,
    channelGroups,
    channelGroupBy,
    isSearching,
    searchResult,
    searchQuery,
  } = useChannel();

  if (isSearching || searchResult.length || searchQuery) {
    return (
      <Box p="4" mt="20">
        {searchQuery.length > 0 && (
          <Heading as="h2" fontSize="lg" color="gray.400" mb="4">
            {isSearching && `Searching "${searchQuery}" ...`}
            {!isSearching &&
              (searchResult.length > 0 ? (
                <>
                  <Box as="span" mr="1">
                    Found {searchResult.length}
                  </Box>
                  <Box as="strong" textDecor="underline" mr="1" color="white">
                    {searchQuery}
                  </Box>
                  <Box as="span">channel(s)</Box>
                </>
              ) : (
                <>
                  <Box as="span" mr="1">
                    Sorry, no results containing
                  </Box>
                  <Box as="strong" textDecor="underline" mr="1" color="white">
                    {searchQuery}
                  </Box>
                  <Box as="span">were found.</Box>
                </>
              ))}
          </Heading>
        )}

        {searchResult.length > 0 &&
          (isSearching ? (
            <ChannelItemSearchLoader />
          ) : (
            <ChannelGroupItem items={searchResult.map((items) => items.item)} />
          ))}
      </Box>
    );
  }

  return (
    <Box p="4" mt="20">
      {channelGroups.map((group) => {
        const items = channelGroupBy[group];
        const groupByCategory = groupBy === EChannelGroupBy.Category;
        let { code = group, country = group, flag = false } =
          (!groupByCategory && items?.[0]) || {};

        const countryFlag = (
          <Box as="span" display="inline-flex" lineHeight="none">
            {flag && (
              <Icon svg as={Flag} countryCode={code} title={country} mr="2" />
            )}
            <Box as="span">{country}</Box>
          </Box>
        );

        const title = groupByCategory ? group : countryFlag;

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
