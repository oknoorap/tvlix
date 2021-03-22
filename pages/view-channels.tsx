import { ChannelProvider } from "hooks/use-channel";
import Navbar from "layouts/navbar";

import ChannelExplorer from "views/channel-explorer";
import ChannelExplorerNavbar from "views/channel-explorer/navbar";
import Info from "views/info";

const ViewChannelPage = () => {
  return (
    <ChannelProvider>
      <ChannelExplorer>
        <Navbar>
          <ChannelExplorerNavbar />
          <Info />
        </Navbar>
      </ChannelExplorer>
    </ChannelProvider>
  );
};

export default ViewChannelPage;
