import { ChannelProvider } from "hooks/use-channel";
import { VideoPlayerProvider } from "hooks/use-video-player";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Navbar from "layouts/navbar";

const Homepage = () => {
  return (
    <ChannelProvider>
      <VideoPlayerProvider>
        <VideoPlayer>
          <Navbar variant="ghost">
            <VideoTitle />
            <Info />
          </Navbar>
        </VideoPlayer>
      </VideoPlayerProvider>
    </ChannelProvider>
  );
};

export default Homepage;
