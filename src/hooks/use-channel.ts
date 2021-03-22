import { useEffect, useState, useCallback, useMemo } from "react";
import { createContainer } from "unstated-next";
import playlistParser from "iptv-playlist-parser";
import slugify from "slugify";
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
  slug?: string;
  link?: string;
  hash?: string;
};

export const parseM3U = (string: string) => {
  const { items } = playlistParser.parse(string);
  const channels = items
    .map((item) => ({
      ...item.tvg,
      name: item.name,
      group: item.group.title || "Uncategorized",
      url: item.url,
    }))
    .map((item) => {
      const slug = slugify(item.name, {
        lower: true,
        remove: /\(\)\/\./g,
        replacement: "-",
      });
      const hashed = hash(JSON.stringify(item));
      const link = `channel-${hashed}--${slug}`;
      return {
        ...item,
        slug,
        link,
        hash: hashed,
      };
    });

  return channels;
};

export const fetchChannels = async () => {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/channels.m3u`;
  try {
    const response = await fetch(url);
    const text = await response.text();
    return parseM3U(text);
  } catch (err) {
    console.error(err);
    console.log(`Can't fetch channels please reload`);
  }
};

const useChannelHook = (initialChannel: Channel) => {
  const [isChannelLoaded, setChannelLoadStatus] = useState<boolean>();
  const [currentChannel, setCurrentChannel] = useState<Channel>(initialChannel);
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
  const groupKeys = useMemo(() => {
    const groups =
      groupBy === EChannelGroupBy.Country
        ? Object.keys(channelGroups)
        : ["All", ...Object.keys(channelGroups)];
    groups.sort((a, z) => a.localeCompare(z));
    return groups;
  }, [channelGroups, groupBy]);
  const [selectedCategory, setCategory] = useState(groupKeys[0]);

  const randomizeChannel = useCallback(
    (customChannels?: Channel[]) => {
      const channel = shuffle(
        channels.length > 0 ? channels : customChannels
      )?.[0];
      setCurrentChannel(channel);
    },
    [channels]
  );

  const channelList = useMemo(
    () =>
      groupBy === EChannelGroupBy.Country
        ? groupKeys
        : groupKeys
            .slice(1, groupKeys.length)
            .filter((item) =>
              selectedCategory === "All" ? true : item === selectedCategory
            ),
    [groupKeys, selectedCategory]
  );

  const categoryMenus = useMemo(
    () =>
      groupKeys.map((item) => ({
        id: slugify(item),
        label: item,
        isSelected: selectedCategory === item,
        onClick() {
          setCategory(item);
        },
      })),
    [groupKeys, selectedCategory]
  );

  const groupByMenus = [
    {
      id: EChannelGroupBy.Country,
      label: "Countries",
      isSelected: groupBy === EChannelGroupBy.Country,
      onClick() {
        setGroupBy(EChannelGroupBy.Country);
      },
    },

    {
      id: EChannelGroupBy.Category,
      label: "Categories",
      isSelected: groupBy === EChannelGroupBy.Category,
      onClick() {
        setGroupBy(EChannelGroupBy.Category);
      },
    },
  ];

  useEffect(() => {
    if (!process.browser) return;
    const getChannels = async () => {
      const channels = await fetchChannels();
      setChannels(channels);
      setChannelLoadStatus(true);
      if (!initialChannel) {
        randomizeChannel(channels);
      }
    };
    getChannels();
  }, []);

  return {
    channels,
    isChannelLoaded,
    currentChannel,
    randomizeChannel,
    groupBy,
    channelGroups,
    channelList,
    groupByMenus,
    categoryMenus,
    selectedCategory,
  };
};

const Container = createContainer(useChannelHook);

export const useChannel = Container.useContainer;

export const ChannelProvider = Container.Provider;

export default Container;
