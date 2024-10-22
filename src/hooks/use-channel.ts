import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { createContainer } from "unstated-next";
import playlistParser from "iptv-playlist-parser";
import slugify from "slugify";
import shuffle from "lodash.shuffle";
import flatten from "lodash.flatten";
import uniqBy from "lodash.uniqby";
import CountryISO from "i18n-iso-countries";
import Fuse from "fuse.js";

import { hash } from "utils/helpers";

CountryISO.registerLocale(require("i18n-iso-countries/langs/en.json"));

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
  flag?: boolean;
  code?: string;
  url: string;
  group: string;
  link?: string;
  hash?: string;
  ref: string;
  rec?: string;
};

type Filter = string[];

export const Uncategorized = "Uncategorized";

export const UncategorizedCode = "UC";

export const parseM3U = (string: string) => {
  const slugOpts = {
    lower: true,
    remove: /[\(\)\/\.]/g,
    replacement: " ",
  };
  const { items } = playlistParser.parse(string);
  const playlist: Channel[] = uniqBy(
    items
      .map((item) => ({
        ...item.tvg,
        name: item.name,
        group: item.group.title || Uncategorized,
        url: item.url,
      }))
      .map((item) => {
        const hashes = hash(JSON.stringify(item));
        const start = hashes.slice(0, 5);
        const end = hashes.slice(-5);
        const ref = slugify(item.name, slugOpts);
        const link = `channel-${start + end}`;
        return {
          ...item,
          link,
          ref,
          hash: hashes,
        };
      }),
    "ref"
  );
  return playlist;
};

export const fetchChannels = async () => {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}assets/media/channels.m3u`;
  try {
    const response = await fetch(url);
    return parseM3U(await response.text());
  } catch (err) {
    console.error(err);
    console.log(`Can't fetch channels please reload`);
  }
};

const useChannelHook = (initialChannel: Channel) => {
  const fuse = useRef<Fuse<Channel>>();
  const [isChannelLoaded, setChannelLoadStatus] = useState<boolean>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groupBy, setGroupBy] = useState<EChannelGroupBy>(
    EChannelGroupBy.Category
  );

  const channelGroupBy = useMemo<{ [key: string]: Channel[] }>(() => {
    const items = {};
    const countries = Array.from(
      new Set(flatten(channels.map((item) => item.country.split(";"))))
    ).map((code: string) => {
      [
        ["All", "All"],
        ["ARAB", "AR"],
        ["UK", "GBR"],
      ].forEach(([oldCode, newCode]) => {
        if (code === oldCode) code = newCode;
      });

      let country = CountryISO.getName(code, "en", {
        select: "official",
      });

      let flag = false;
      if (!country) country = code;
      if (country !== code) flag = true;
      if (code === UncategorizedCode) country = Uncategorized;

      return {
        code,
        country,
        flag,
      };
    });

    channels.forEach((item) => {
      const { country, group } = item;
      const itemCountries = country.split(";");

      itemCountries.forEach((country) => {
        if (!country) country = UncategorizedCode;
        const findCountry = countries.find((item) => item.code === country);
        if (!findCountry) return;

        if (groupBy === EChannelGroupBy.Category) {
          if (!items[group]) items[group] = [];
          items[group].push({
            ...item,
            ...findCountry,
          });
        } else {
          if (!items[country]) items[country] = [];
          items[country].push({
            ...item,
            ...findCountry,
          });
        }
      });
    });

    Object.keys(items).forEach((key) => {
      items[key] = uniqBy(items[key], "ref");
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
  const [selectedCountry, setCountry] = useState({
    code: "All",
    country: "All",
    flag: false,
  });

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
          selectedCountry.code === "All" ? true : item === selectedCountry.code
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

  const countryMenus = useMemo(() => {
    if (groupBy === EChannelGroupBy.Category) return [];
    return filters.map((item) => {
      const { flag = false, code = "All", country = "All" } =
        channelGroupBy[item]?.[0] || {};
      return {
        id: slugify(code),
        flag,
        code,
        label: country,
        isSelected: selectedCountry.code === code,
        onClick() {
          setCountry({ code, country, flag });
        },
      };
    });
  }, [groupBy, channelGroupBy, filters, selectedCountry]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setSearchStatus] = useState(false);
  const [searchResult, setSearchResult] = useState<Fuse.FuseResult<Channel>[]>(
    []
  );
  const search = useCallback((query: string = "") => {
    const timeout = setTimeout(() => {
      setSearchStatus(false);
    }, 500);

    if (!query) {
      setSearchStatus(false);
      setSearchResult([]);
    }

    setSearchStatus(true);
    setSearchQuery(query);
    if (query.length && fuse.current) {
      const searchResult = fuse.current.search(query.toLowerCase());
      setSearchResult(searchResult);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!process.browser) return;
    let subscribed = true;

    const getChannels = async () => {
      const channels = await fetchChannels();
      const options = {
        keys: ["ref", "name"],
        threshold: 0.3,
        distance: 0,
      };
      const channelIndex = Fuse.createIndex(options.keys, channels);
      fuse.current = new Fuse(channels, options, channelIndex);
      setChannels(channels);
      setChannelLoadStatus(true);

      if (!initialChannel) {
        randomizeChannel(channels);
      } else {
        setCurrentChannel(initialChannel);
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
    countryMenus,
    selectedCategory,
    selectedCountry,
    isSearching,
    searchResult,
    searchQuery,
    search,
  };
};

const Container = createContainer(useChannelHook);

export const useChannel = Container.useContainer;

export const ChannelProvider = Container.Provider;

export default Container;
