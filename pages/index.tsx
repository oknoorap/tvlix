import { ChannelProvider } from "hooks/use-channel";
import { VideoPlayerProvider } from "hooks/use-video-player";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Layout from "layouts/default";

const Homepage = () => {
  return (
    <ChannelProvider>
      <VideoPlayerProvider>
        <VideoPlayer>
          <Layout variant="ghost">
            <VideoTitle />
            <Info />
          </Layout>
        </VideoPlayer>
      </VideoPlayerProvider>
    </ChannelProvider>
  );
};

export default Homepage;
