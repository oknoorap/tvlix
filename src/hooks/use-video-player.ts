import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createContainer } from "unstated-next";
import HLS from "hls.js";

const useVideoPlayerHook = () => {
  const hlsRef = useRef<HLS>();
  const videoRef = useRef<HTMLVideoElement & { align: any }>();
  const [isPlayerReady, setPlayerReadyStatus] = useState<boolean>(false);
  const [isVideoReady, setVideoReadyStatus] = useState<boolean>(false);
  const [isRequestReload, setReloadStatus] = useState<boolean>(false);
  const [isVideoLoading, setVideoLoadingStatus] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const isPlaying = useMemo(() => isVideoReady && !isVideoLoading, [
    isVideoReady,
    isVideoLoading,
  ]);

  const loadVideo = useCallback((src: string) => {
    setVideoSrc(src);
  }, []);

  // const playVideo = useCallback(async () => {
  //   if (isVideoReady && videoRef.current) {
  //     setVideoLoadingStatus(true);
  //     await videoRef.current.play();
  //     setVideoLoadingStatus(false);
  //   }
  // }, [isVideoReady]);

  const attachVideo = useCallback(() => {
    hlsRef.current = new HLS({
      capLevelToPlayerSize: true,
    });
    hlsRef.current.attachMedia(videoRef.current);
    hlsRef.current.on(HLS.Events.MEDIA_ATTACHED, (_, data) => {
      setPlayerReadyStatus(true);
    });
    hlsRef.current.on(HLS.Events.ERROR, (_, { type, details, fatal }) => {
      if (fatal) {
        setReloadStatus(true);
      }
    });
  }, []);

  const reattachVideo = useCallback(() => {
    if (!hlsRef.current) {
      return;
    }

    hlsRef.current.destroy();
    setReloadStatus(false);
    setPlayerReadyStatus(false);
    setVideoReadyStatus(false);
    setVideoLoadingStatus(false);
    hlsRef.current.detachMedia();
    hlsRef.current.off(HLS.Events.MEDIA_ATTACHED);
    hlsRef.current.off(HLS.Events.MANIFEST_PARSED);
    hlsRef.current = null;
    attachVideo();
  }, []);

  useEffect(() => {
    if (!HLS.isSupported()) {
      return;
    }

    if (videoRef.current) {
      attachVideo();
    }
  }, []);

  useEffect(() => {
    if (!hlsRef.current) {
      return;
    }

    if (isPlayerReady && videoSrc) {
      hlsRef.current.loadSource(videoSrc);
      hlsRef.current.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
        setVideoReadyStatus(true);
        setVideoLoadingStatus(true);
        setReloadStatus(false);
        videoRef.current.play().then(() => {
          setVideoLoadingStatus(false);
        });
      });
    }
  }, [videoSrc, isPlayerReady]);

  return {
    videoRef,
    loadVideo,
    isPlayerReady,
    isVideoReady,
    isRequestReload,
    isPlaying,
    isVideoLoading,
    reattachVideo,
  };
};

const Container = createContainer(useVideoPlayerHook);

export const useVideoPlayer = Container.useContainer;

export const VideoPlayerProvider = Container.Provider;

export default Container;
