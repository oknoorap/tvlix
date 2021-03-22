import { FC } from "react";
import { Flex, Box, SimpleGrid, Link } from "@chakra-ui/react";
import { opacify } from "polished";
import NextLink from "next/link";

import useIntersection from "hooks/use-intersection";
import { useChannel, Channel, EChannelGroupBy } from "hooks/use-channel";
import Image from "components/image";
import Country from "components/country";
import colors from "themes/default/colors";

type ChannelGroupItem = {
  items: Channel[];
};

const ChannelGroupItem: FC<ChannelGroupItem> = ({ items }) => {
  const { ref, isRender } = useIntersection();
  const { groupBy } = useChannel();
  const imagePlaceholder = require("../../../public/channel.png?url");
  return (
    <SimpleGrid ref={ref} columns={5} columnGap="5" rowGap="5">
      {isRender &&
        items.map((item, index) => (
          <Box key={`slider-${index}`} role="group" position="relative">
            <Image
              src={item.logo || imagePlaceholder}
              placeholderSrc={imagePlaceholder}
              // className="w-full h-auto min-h-full max-h-32"
              alt=""
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bgColor={opacify(0.75, colors.mirage["500"])}
              transition="opacity"
              zIndex="10"
              _groupHover={{
                bgColor: opacify(1, colors.mirage["500"]),
              }}
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              position="absolute"
              left="0"
              bottom="0"
              w="full"
              h="full"
            >
              <NextLink href={`/watch/${item.link}`} passHref>
                <Link
                  display="flex"
                  alignItems="center"
                  flexDir="column"
                  color="gray.500"
                  fontSize="xl"
                  textAlign="center"
                  _groupHover={{ color: "white" }}
                >
                  <Box
                    display="block"
                    as="span"
                    w="66%"
                    whiteSpace="nowrap"
                    lineHeight="shorter"
                    mb="2"
                  >
                    {item.name}
                  </Box>
                  <Box display="block" as="span">
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
