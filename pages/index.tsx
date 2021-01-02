import dynamic from "next/dynamic";

import { VideoPlayerProvider } from "hooks/use-video-player";

import VideoPlayer from "views/video-player";
import VideoTitle from "views/video-player/title";
import Info from "views/info";
import Navbar from "components/navbar";

const Chat = dynamic(() => import("views/chat"), {
  ssr: false,
});

const ChatProvider = dynamic(
  () => import("hooks/use-chat").then((mod) => mod.ChatProvider),
  {
    ssr: false,
  }
);

const Homepage = () => {
  return (
    <VideoPlayerProvider>
      <VideoPlayer>
        <Navbar>
          <VideoTitle />
          <Info />
        </Navbar>
      </VideoPlayer>

      <ChatProvider>
        <Chat />
      </ChatProvider>
    </VideoPlayerProvider>
  );
};

export default Homepage;

// <iframe data-aa="1534203" src="//ad.a-ads.com/1534203?size=728x90" scrolling="no" style="width:728px; height:90px; border:0px; padding:0; overflow:hidden" allowtransparency="true"></iframe>
