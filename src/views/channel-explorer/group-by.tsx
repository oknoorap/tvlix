import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import {
  BsChevronDown as ChevronDownIcon,
  BsChevronRight as ChevronRightIcon,
} from "react-icons/bs";
import { BiGridSmall as GroupByIcon } from "react-icons/bi";

import { useChannel } from "hooks/use-channel";

const ChannelGroupByDropdown = () => {
  const { groupByMenus } = useChannel();

  return (
    <Menu placement="bottom-end">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            display="flex"
            alignItems="center"
            bgColor="mirage.400"
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
            <Icon as={GroupByIcon} w="6" h="auto" />
            <Box as="span" fontSize="sm">
              {groupByMenus.find((item) => item.isSelected)?.label}
            </Box>
          </MenuButton>
          <MenuList fontSize="sm" minWidth="150px" bgColor="mirage.300">
            {groupByMenus.map(({ id, label, onClick, isSelected }) => (
              <MenuItem
                key={`menu-${id}`}
                fontWeight={isSelected && "bold"}
                onClick={onClick}
              >
                By {label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ChannelGroupByDropdown;
