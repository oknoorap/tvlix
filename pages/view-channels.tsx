import Navbar from "components/navbar";

import ChannelExplorer from "views/channel-explorer";
import ChannelExplorerNavbar from "views/channel-explorer/navbar";
import Info from "views/info";

const ViewChannelPage = () => {
  return (
    <ChannelExplorer>
      <Navbar align="center" withBg>
        <ChannelExplorerNavbar />
        <Info />
      </Navbar>
    </ChannelExplorer>
  );
};

export default ViewChannelPage;
