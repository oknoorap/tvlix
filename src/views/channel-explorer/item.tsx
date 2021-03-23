import { FC } from "react";
import { Flex, Box, SimpleGrid, Link, Image } from "@chakra-ui/react";
import { rgba } from "polished";
import NextLink from "next/link";

import useIntersection from "hooks/use-intersection";
import { useChannel, Channel, EChannelGroupBy } from "hooks/use-channel";
import Country from "components/country";
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
      {isRender &&
        items.map((item, index) => (
          <Box
            key={`slider-${index}`}
            role="group"
            position="relative"
            userSelect="none"
          >
            <ChannelLogo src={item.logo} alt={item.name} />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bgColor={rgba(colors.mirage["500"], 0.8)}
              transition="opacity"
              pointerEvents="none"
              zIndex="10"
              _groupHover={{ bgColor: rgba(colors.mirage["500"], 0.55) }}
            />
            <Flex
              position="absolute"
              top="0"
              left="0"
              alignItems="center"
              justifyContent="center"
              w="full"
              h="full"
              zIndex="11"
            >
              <NextLink href={`/watch/${item.link}`} passHref>
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
                    {item.name}
                  </Box>
                  <Box as="span" fontSize="sm">
                    {groupBy === EChannelGroupBy.Category ? (
                      <Country code={item.country} />
                    ) : (
                      item.group
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
