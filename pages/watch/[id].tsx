import { GetStaticProps, GetStaticPaths } from "next";

import { ChannelProvider } from "hooks/use-channel";
import { VideoPlayerProvider } from "hooks/use-video-player";
import { fetchChannels } from "hooks/use-channel";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Navbar from "components/navbar";

const ChannelPage = ({ channel }) => {
  return (
    <ChannelProvider initialState={channel}>
      <VideoPlayerProvider>
        <VideoPlayer>
          <Navbar>
            <VideoTitle />
            <Info />
          </Navbar>
        </VideoPlayer>
      </VideoPlayerProvider>
    </ChannelProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const channels = await fetchChannels();
  return {
    paths: channels.map((item) => ({
      params: { id: item.link },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const channels = await fetchChannels();
  const props = {
    channel: channels.find((item) => item.link === context.params.id),
  };

  return {
    props,
  };
};

export default ChannelPage;
