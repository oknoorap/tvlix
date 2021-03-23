import { MouseEvent } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Icon,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  BsChevronDown as ChevronDownIcon,
  BsChevronRight as ChevronRightIcon,
} from "react-icons/bs";
import Flag from "react-country-flag";

import { useChannel } from "hooks/use-channel";

const ChannelGroupFilterByCountry = () => {
  const { countryMenus, selectedCountry } = useChannel();

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton
            as={Button}
            display="flex"
            alignItems="center"
            bgColor="mirage.400"
            fontSize="sm"
            ml="4"
            rightIcon={
              <Icon
                as={!isOpen ? ChevronRightIcon : ChevronDownIcon}
                ml="2"
                w="3"
                h="auto"
              />
            }
            _hover={{ bgColor: "mirage.300" }}
            _active={{ bgColor: "mirage.300" }}
            _focus={{ outline: "none" }}
          >
            {selectedCountry.flag && (
              <Icon
                svg
                as={Flag}
                countryCode={selectedCountry.code}
                title={selectedCountry.country}
                mr="2"
              />
            )}
            <Text as="span" isTruncated>
              {selectedCountry.country}
            </Text>
          </MenuButton>
          <MenuList fontSize="sm" maxW="55vw" bgColor="mirage.300">
            <SimpleGrid maxH="200px" overflow="auto" columns={4}>
              {countryMenus.map(({ id, label, onClick, isSelected, flag }) => {
                const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  onClick();
                  onClose();
                };
                return (
                  <Link
                    key={`country-${id}`}
                    href="#"
                    px="2"
                    py="1"
                    display="inline-flex"
                    alignItems="center"
                    color={isSelected && "white"}
                    fontWeight={isSelected && "bold"}
                    textDecor={isSelected && "underline"}
                    onClick={handleClick}
                    _focus={{ outline: "none" }}
                  >
                    {flag && (
                      <Icon
                        svg
                        as={Flag}
                        countryCode={id}
                        title={label}
                        mr="2"
                      />
                    )}
                    <Text as="span" isTruncated>
                      {label}
                    </Text>
                  </Link>
                );
              })}
            </SimpleGrid>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ChannelGroupFilterByCountry;
