import { useEffect, useState, useCallback, useMemo } from "react";
import { createContainer } from "unstated-next";
import playlistParser from "iptv-playlist-parser";
import shuffle from "lodash.shuffle";
import _groupBy from "lodash.groupby";

import { hash } from "utils/helpers";

export enum EChannelGroupBy {
  Country,
  Category,
}

export type Channel = {
  id: string;
  name: string;
  language: string;
  logo: string;
  country: string;
  url: string;
  group: string;
  hash?: string;
};

const useChannelHook = () => {
  const [isChannelLoaded, setChannelLoadStatus] = useState<boolean>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groupBy, setGroupBy] = useState<EChannelGroupBy>(
    EChannelGroupBy.Category
  );
  const channelGroups = useMemo(
    () =>
      _groupBy(
        channels,
        groupBy === EChannelGroupBy.Category ? "group" : "country"
      ),
    [channels, groupBy]
  );

  const randomizeChannel = useCallback(
    (customChannels?: Channel[]) => {
      const channel = shuffle(
        channels.length > 0 ? channels : customChannels
      )?.[0];
      setCurrentChannel(channel);
    },
    [channels]
  );

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("/channels.m3u");
        const text = await response.text();
        const { items } = playlistParser.parse(text);
        const channels = items
          .map((item) => ({
            ...item.tvg,
            name: item.name,
            group: item.group.title || "Uncategorized",
            url: item.url,
          }))
          .map((item) => ({
            ...item,
            hash: hash(JSON.stringify(item)),
          }));

        setChannels(channels);
        setChannelLoadStatus(true);
        randomizeChannel(channels);
      } catch (err) {
        console.error(err);
        console.log(`Can't fetch channels please reload`);
      }
    };
    fetchChannels();
  }, []);

  return {
    channels,
    isChannelLoaded,
    currentChannel,
    randomizeChannel,
    groupBy,
    setGroupBy,
    channelGroups,
  };
};

const Container = createContainer(useChannelHook);

export const useChannel = Container.useContainer;

export const ChannelProvider = Container.Provider;

export default Container;
