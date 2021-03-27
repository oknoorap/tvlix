import { NextSeo } from "next-seo";

import Layout from "layouts/default";
import { ChannelProvider } from "hooks/use-channel";
import ChannelExplorer from "views/channel-explorer";
import ChannelExplorerNavbar from "views/channel-explorer/navbar";
import Info from "views/info";

const ViewChannelPage = () => {
  return (
    <>
      <NextSeo
        title="Browse 6000+ Channels"
        description="Browse 6000 IPTV Channels Grouped By Categories or Countries"
      />
      <ChannelProvider>
        <ChannelExplorer>
          <Layout>
            <ChannelExplorerNavbar />
            <Info />
          </Layout>
        </ChannelExplorer>
      </ChannelProvider>
    </>
  );
};

export default ViewChannelPage;
