import { useEffect, useState, useCallback, useMemo } from "react";
import { createContainer } from "unstated-next";
import playlistParser from "iptv-playlist-parser";
import slugify from "slugify";
import shuffle from "lodash.shuffle";
import _groupBy from "lodash.groupby";
import flatten from "lodash.flatten";
import uniqBy from "lodash.uniqby";
import CountryISO from "i18n-iso-countries";

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

type Filter = string[];

export const Uncategorized = "Uncategorized";

export const UncategorizedCode = "UC";

type Country = { country: string; code: string; flag: boolean };

export const parseM3U = (string: string) => {
  const { items } = playlistParser.parse(string);
  const channels = items
    .map((item) => ({
      ...item.tvg,
      name: item.name,
      group: item.group.title || Uncategorized,
      url: item.url,
    }))
    .map((item) => {
      const slug = slugify(item.name, {
        lower: true,
        remove: /[\(\)\/\.]/g,
        replacement: "-",
      });
      const hashes = hash(JSON.stringify(item));
      const start = hashes.slice(0, 5);
      const end = hashes.slice(-5);
      const link = `channel-${slug}-${start + end}`;
      return {
        ...item,
        slug,
        link,
        hash: hashes,
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

  const channelGroupBy = useMemo<{ [key: string]: Channel[] }>(() => {
    if (groupBy === EChannelGroupBy.Category) {
      return _groupBy(channels, "group");
    }

    const items = {};
    const countries = Array.from(
      new Set(flatten(channels.map((item) => item.country.split(";"))))
    ).map((item) => (!item ? UncategorizedCode : item));

    channels.forEach((item) => {
      const { country } = item;
      const itemCountries = country.split(";");
      itemCountries.forEach((country) => {
        if (!country) country = UncategorizedCode;
        if (!items[country]) items[country] = [];
        if (countries.includes(country)) {
          items[country].push(item);
        }
      });
    });
    return items;
  }, [channels, groupBy]);

  const filters = useMemo<Filter>(
    () => [
      "All",
      ...Object.keys(channelGroupBy).sort((a, z) => a.localeCompare(z)),
    ],
    [channelGroupBy, groupBy]
  );

  const [firstFilter] = filters;
  const [selectedCategory, setCategory] = useState(firstFilter);
  const [selectedCountry, setCountry] = useState(firstFilter);

  const randomizeChannel = useCallback(
    (customChannels?: Channel[]) => {
      const [channel] = shuffle(
        channels.length > 0 ? channels : customChannels
      );
      setCurrentChannel(channel);
    },
    [channels]
  );

  const channelGroups = useMemo(() => {
    if (groupBy === EChannelGroupBy.Country) {
      return filters
        .slice(1, filters.length)
        .filter((item) =>
          selectedCountry === "All" ? true : item === selectedCountry
        );
    }

    return filters
      .slice(1, filters.length)
      .filter((item) =>
        selectedCategory === "All" ? true : item === selectedCategory
      );
  }, [filters, selectedCategory, selectedCountry]);

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

  const categoryMenus = useMemo(() => {
    if (groupBy === EChannelGroupBy.Country) return [];
    return filters.map((item) => ({
      id: slugify(item),
      label: item,
      isSelected: selectedCategory === item,
      onClick() {
        setCategory(item);
      },
    }));
  }, [groupBy, filters, selectedCategory]);

  const countries = useMemo<Country[]>(
    () =>
      uniqBy(
        filters.map((code) => {
          let countryCode = code;
          [
            ["All", "All"],
            ["ARAB", "AR"],
            ["UK", "GBR"],
          ].forEach(([oldCode, newCode]) => {
            if (countryCode === oldCode) countryCode = newCode;
          });

          let country = CountryISO.getName(countryCode, "en", {
            select: "official",
          });
          let flag = false;
          if (!country) country = countryCode;
          if (country !== countryCode) flag = true;
          if (code === UncategorizedCode) country = Uncategorized;
          return {
            code,
            country,
            flag,
          };
        }),
        "code"
      ),
    [filters]
  );

  console.log({ countries });

  const countryMenus = useMemo(() => {
    if (groupBy === EChannelGroupBy.Category) return [];
    return countries.map(({ code: id, country: label, flag }) => {
      return {
        id,
        label,
        flag,
        isSelected: selectedCountry === id,
        onClick() {
          setCountry(id);
        },
      };
    });
  }, [groupBy, countries, selectedCountry]);

  useEffect(() => {
    if (!process.browser) return;
    let subscribed = true;

    const getChannels = async () => {
      const channels = await fetchChannels();

      setChannels(channels);
      setChannelLoadStatus(true);

      if (!initialChannel) {
        randomizeChannel(channels);
      }
    };

    getChannels();
    return void (subscribed = false);
  }, []);

  return {
    channels,
    isChannelLoaded,
    currentChannel,
    randomizeChannel,
    groupBy,
    channelGroupBy,
    channelGroups,
    groupByMenus,
    categoryMenus,
    countries,
    countryMenus,
    selectedCategory,
    selectedCountry,
  };
};

const Container = createContainer(useChannelHook);

export const useChannel = Container.useContainer;

export const ChannelProvider = Container.Provider;

export default Container;
