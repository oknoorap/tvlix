import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  Icon,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import Logo from "assets/svg/logo.svg?sprite";
import { BiCoffeeTogo as CoffeeIcon } from "react-icons/bi";
import { FaEthereum as EthereumIcon } from "react-icons/fa";

type InfoModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const InfoModal: FC<InfoModalProps> = ({ isOpen, onClose = () => {} }) => {
  const credits = [
    {
      name: "HLS.js",
      description: "JavaScript HLS client using Media Source Extension.",
      link: "https://github.com/video-dev/hls.js/",
    },

    {
      name: "iptv",
      description:
        "Collection of 5000+ publicly available IPTV channels from all over the world.",
      link: "https://github.com/iptv-org/iptv",
    },

    {
      name: "orbit-db",
      description: "Peer-to-Peer Databases for the Decentralized Web.",
      link: "https://github.com/orbitdb/orbit-db",
    },

    {
      name: "js-sha256",
      description:
        "A simple SHA-256 / SHA-224 hash function for JavaScript supports UTF-8 encoding.",
      link: "https://github.com/emn178/js-sha256",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="white">
        <ModalBody>
          <Box
            py="4"
            position="relative"
            zIndex="40"
            rounded="lg"
            color="gray.500"
          >
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              mb="6"
            >
              <Icon as={Logo} w="48" h="auto" mb="1" />
              <Box as="span" fontSize="sm">
                Online TV Streaming Watching Party
              </Box>
            </Flex>
            <Text fontSize="sm" mb="4">
              TVLiX is Open Source project created by{" "}
              <Link
                isExternal
                href="https://twitter.com/oknoorap"
                rel="noopener"
                fontWeight="semibold"
                color="blue.400"
              >
                @oknoorap
              </Link>
              . Please submit feedback to{" "}
              <Link
                isExternal
                href="https://github.com/oknoorap/tvlix"
                textDecor="underline"
                rel="noopener"
                _hover={{ textDecor: "none" }}
              >
                Github
              </Link>
              .
            </Text>
            <Text display="flex" alignItems="center" fontSize="sm" mb="1">
              Buy me a{" "}
              <Icon
                as={CoffeeIcon}
                fill="current"
                w="4"
                h="4"
                color="red.800"
              />{" "}
              coffee via ETH:
            </Text>
            <Text
              display="flex"
              alignItems="center"
              userSelect="all"
              bg="gray.100"
              color="red.700"
              py="1"
              mb="6"
            >
              <Icon
                as={EthereumIcon}
                display="inline"
                fill="current"
                color="purple.700"
                mr="1"
              />{" "}
              0xab1c4e446900ad20bf5fae1be67f87d54dacd2f0
            </Text>
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="bold"
              textDecor="underline"
              mb="2"
            >
              Thanks to
            </Heading>
            <Box py="2" px="4" bgColor="gray.100" h="48" overflow="auto">
              {credits.map(({ name, link, description }, index) => (
                <Box _notLast={{ mb: 4 }} key={`credit-${index}`}>
                  <Box fontWeight="bold">{name}</Box>
                  <Box fontSize="sm" color="gray.500">
                    {description}
                  </Box>
                  <Link
                    isExternal
                    href={link}
                    rel="noopener"
                    color="red.700"
                    textDecor="underline"
                  >
                    {link}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
