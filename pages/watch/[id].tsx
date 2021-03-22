import { GetStaticProps, GetStaticPaths } from "next";

import { ChannelProvider } from "hooks/use-channel";
import { VideoPlayerProvider } from "hooks/use-video-player";
import { fetchChannels, parseM3U } from "hooks/use-channel";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Navbar from "layouts/navbar";

const ChannelPage = ({ channel }) => {
  return (
    <ChannelProvider initialState={channel}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const playlist = await import("../../public/channels.m3u");
  const channels = parseM3U(playlist.default);
  return {
    paths: channels.map((item) => ({
      params: { id: item.link },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const playlist = await import("../../public/channels.m3u");
  const channels = parseM3U(playlist.default);
  const props = {
    channel: channels.find((item) => item.link === context.params.id),
  };

  return {
    props,
  };
};

export default ChannelPage;
