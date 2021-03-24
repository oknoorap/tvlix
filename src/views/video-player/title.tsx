import { FC } from "react";
import NextLink from "next/link";
import { Flex, Link, Icon } from "@chakra-ui/react";
import { BiTv as TVIcon } from "react-icons/bi";

import { useChannel } from "hooks/use-channel";

const ChannelTitleView: FC = () => {
  const { currentChannel } = useChannel();
  if (!currentChannel?.name) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      opacity=".75"
      visibility="hidden"
      mr="auto"
      textShadow="darker"
      _hover={{ opacity: 1 }}
      _groupHover={{ visibility: "visible" }}
    >
      <Icon as={TVIcon} fill="current" color="white" w="6" h="6" mr="2" />
      <NextLink href={`/watch/${currentChannel?.link}`} passHref>
        <Link fontSize="2xl" textDecor="none" _focus={{ outline: "none" }}>
          {currentChannel?.name}
        </Link>
      </NextLink>
    </Flex>
  );
};

export default ChannelTitleView;
