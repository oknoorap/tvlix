import { FC } from "react";
import { Flex, Box, Link, Icon, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BiBroadcast as ChannelListIcon } from "react-icons/bi";

import Logo from "assets/svg/logo.svg?sprite";

type DefaultLayoutVariant = "default" | "ghost";

type DefaultLayoutProps = {
  variant?: DefaultLayoutVariant;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({
  children,
  variant = "default",
}) => {
  const { pathname } = useRouter();
  const isViewChannelLink = pathname === "/" || pathname.includes("/watch");
  const href = isViewChannelLink ? "/view-channels" : "/";
  const textlink = isViewChannelLink ? "View Channels" : "Random Channels";
  const isVariantDefault = variant === "default";

  return (
    <>
      <VisuallyHidden>
        <a className="skip-link" href="#maincontent">
          Skip to main content
        </a>
      </VisuallyHidden>
      <Box as="main" id="maincontent">
        <Box
          as="header"
          position="fixed"
          top="0"
          left="0"
          w="full"
          zIndex="50"
          bgColor={isVariantDefault && "mirage.500"}
          shadow={isVariantDefault && "md"}
        >
          <Flex
            as="nav"
            p="4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between" mr="2">
              <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <NextLink href="/" passHref>
                  <Link _focus={{ outline: "none" }}>
                    <Icon as={Logo} w="32" h="auto" />
                    <VisuallyHidden>TVLix</VisuallyHidden>
                  </Link>
                </NextLink>
                <NextLink href={href} passHref>
                  <Link
                    display="flex"
                    alignItems="center"
                    fontSize="sm"
                    fontWeight="bold"
                    color="white"
                    _focus={{ outline: "none" }}
                  >
                    <Icon
                      as={ChannelListIcon}
                      w="4"
                      h="4"
                      mr="1"
                      cursor="pointer"
                    />
                    <Box as="span">{textlink}</Box>
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
            {children}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DefaultLayout;
