import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ChannelProvider } from "hooks/use-channel";
import { VideoPlayerProvider } from "hooks/use-video-player";
import { parseM3U } from "hooks/use-channel";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Navbar from "layouts/navbar";

const ChannelPage = ({ channel }) => {
  return (
    <>
      <NextSeo title={`Watch ${channel.name} Online`} />
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
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const playlist = await import("../../public/assets/media/channels.m3u");
  const channels = parseM3U(playlist.default);
  const paths = channels.map((item) => ({
    params: { id: item.link },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const playlist = await import("../../public/assets/media/channels.m3u");
  const channels = parseM3U(playlist.default);
  const channel = channels.find((item) => item.link === context.params.id);
  const props = {
    channel,
  };

  return {
    props,
  };
};

export default ChannelPage;
