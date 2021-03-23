import { FC } from "react";
import { Flex, Box, SimpleGrid, Link, Icon, Text } from "@chakra-ui/react";
import { rgba } from "polished";
import NextLink from "next/link";
import Flag from "react-country-flag";

import useIntersection from "hooks/use-intersection";
import { useChannel, Channel, EChannelGroupBy } from "hooks/use-channel";
import colors from "themes/default/colors";

import ChannelLogo from "./logo";

type ChannelGroupItem = {
  items: Channel[];
};

const ChannelGroupItem: FC<ChannelGroupItem> = ({ items }) => {
  const { ref, isRender } = useIntersection();
  const { groupBy } = useChannel();

  return (
    <SimpleGrid ref={ref} columns={5} columnGap="5" rowGap="5">
      {!isRender &&
        items.map((_, index) => <Box minH="5px" key={`item-${index}`} />)}
      {isRender &&
        items.map(({ logo, name, link, group, flag, code, country }, index) => (
          <Box
            key={`item-${index}`}
            role="group"
            position="relative"
            userSelect="none"
          >
            <ChannelLogo src={logo} alt={name} />
            <Box
              w="full"
              h="full"
              top="0"
              left="0"
              zIndex="10"
              position="absolute"
              transition="opacity"
              pointerEvents="none"
              bgColor={rgba(colors.mirage["500"], 0.8)}
              _groupHover={{ bgColor: rgba(colors.mirage["500"], 0.55) }}
            />
            <Flex
              w="full"
              h="full"
              top="0"
              left="0"
              zIndex="11"
              position="absolute"
              alignItems="center"
              justifyContent="center"
            >
              <NextLink href={`/watch/${link}`} passHref>
                <Link
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  w="full"
                  fontSize="xl"
                  textAlign="center"
                  color="gray.400"
                  _hover={{ textDecor: "none" }}
                  _focus={{ outline: "none" }}
                  _groupHover={{ color: "white" }}
                >
                  <Box
                    as="strong"
                    w="66%"
                    mb="2"
                    lineHeight="shorter"
                    _groupHover={{ textDecor: "underline" }}
                  >
                    {name}
                  </Box>
                  <Box as="span" fontSize="sm">
                    {groupBy === EChannelGroupBy.Country ? (
                      group
                    ) : (
                      <Box as="span" display="inline-flex" lineHeight="none">
                        {flag && (
                          <Icon
                            svg
                            as={Flag}
                            countryCode={code}
                            title={country}
                            mr="2"
                          />
                        )}
                        <Text as="span" isTruncated>
                          {country}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Link>
              </NextLink>
            </Flex>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ChannelGroupItem;
