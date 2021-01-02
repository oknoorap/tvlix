import { useChannel, EChannelGroupBy } from "hooks/use-channel";

import ChannelSearch from "./search";
import ChannelGroupBy from "./group-by";
import ChannelFilter from "./group-filter";

const ChannelExplorerNavbar = () => {
  const { groupBy } = useChannel();
  return (
    <>
      <ChannelSearch />
      <div className="flex items-center ml-4">
        <ChannelGroupBy />
        {groupBy === EChannelGroupBy.Category && <ChannelFilter />}
      </div>
    </>
  );
};

export default ChannelExplorerNavbar;
