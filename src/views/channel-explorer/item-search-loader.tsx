import { SimpleGrid, Skeleton } from "@chakra-ui/react";

const ChannelExplorerItemSearchLoader = () => {
  return (
    <SimpleGrid columns={5} columnGap="5" rowGap="5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          h="120px"
          startColor="mirage.200"
          endColor="mirage.800"
          key={`loading-${index}`}
        />
      ))}
    </SimpleGrid>
  );
};

export default ChannelExplorerItemSearchLoader;
