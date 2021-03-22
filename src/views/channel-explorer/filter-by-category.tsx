import {
  Box,
  Link,
  Icon,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { CgList as SelectCategoryIcon } from "react-icons/cg";

import { useChannel } from "hooks/use-channel";

const ChannelGroupFilterByCategory = () => {
  const { categoryMenus, selectedCategory } = useChannel();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isLazy
      placement="bottom-end"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          ml="2"
          bgColor="mirage.400"
          _hover={{ bgColor: "mirage.300" }}
          _active={{ bgColor: "mirage.300" }}
          _focus={{ outline: "none" }}
        >
          <Box as="span">{selectedCategory}</Box>
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor="mirage.300" _focus={{ outline: "none" }}>
        <PopoverCloseButton _focus={{ outline: "none" }} />
        <PopoverHeader display="flex" alignItems="center">
          <Icon as={SelectCategoryIcon} w="4" h="auto" mr="2" />
          <Box as="span" fontWeight="bold">
            Select Category!
          </Box>
        </PopoverHeader>
        <PopoverBody>
          <SimpleGrid columns={2} color="gray.300">
            {categoryMenus.map(({ id, label, onClick, isSelected }) => {
              const handleClick = () => {
                onClick();
                onClose();
              };
              return (
                <Link
                  key={id}
                  href="#"
                  px="2"
                  py="1"
                  color={isSelected && "white"}
                  fontWeight={isSelected && "bold"}
                  textDecor={isSelected && "underline"}
                  onClick={handleClick}
                  _focus={{ outline: "none" }}
                >
                  {label}
                </Link>
              );
            })}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ChannelGroupFilterByCategory;
