import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createContainer } from "unstated-next";
import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import faker from "faker";
import slugify from "slugify";
import $randomColor from "randomcolor";
import shuffle from "lodash/shuffle";

import useLocalStorage from "hooks/use-storage";

type Chat = {
  address: string;
  time: Date;
  username: string;
  message: string;
  color: string;
  char: string;
};

type IPFSInstance = Window &
  typeof globalThis & {
    ipfs: IPFS.IPFS;
  };

enum ECharacter {
  Dog,
  Fox,
  Cat,
  Lion,
  Tiger,
  Horse,
  Unicorn,
  Cow,
  Pig,
  Monkey,
  Camel,
  Llama,
  Elephant,
  Mouse,
  Hamster,
  Rabbit,
  Bat,
  Bear,
  Koala,
  Panda,
  Chicken,
  HatchingChick,
  BabyChick,
  Bird,
  Penguin,
  Owl,
  Dodo,
  Flamingo,
  Frog,
  Snake,
  Dragon,
  Sauropod,
  TRex,
  Whale,
  Dolphin,
  Seal,
  Fish,
  Blowfish,
  Shark,
  Octopus,
  Shell,
  Snail,
  Butterfly,
  Bug,
  Honeybee,
  Beetle,
  LadyBeetle,
  Scorpion,
  Fly,
  Worm,
  Microbe,
  CherryBlossom,
  WhiteFlower,
  Rosette,
  Rose,
  WiltedFlower,
  Hibiscus,
  Sunflower,
  Blossom,
  Tulip,
  Seedling,
  PottedPlant,
  PalmTree,
  Cactus,
  Herb,
  Shamrock,
  FourLeafClover,
  MapleLeaf,
  Mushroom,
  Crab,
  Shrimp,
  Squid,
  Fire,
  Rainbow,
  NewMoon,
  FullMoon,
  Sun,
}

export const Character = {
  [ECharacter.Dog]: "🐶",
  [ECharacter.Fox]: "🦊",
  [ECharacter.Cat]: "🐱",
  [ECharacter.Lion]: "🦁",
  [ECharacter.Tiger]: "🐯",
  [ECharacter.Horse]: "🐴",
  [ECharacter.Unicorn]: "🦄",
  [ECharacter.Cow]: "🐮",
  [ECharacter.Pig]: "🐷",
  [ECharacter.Monkey]: "🐵",
  [ECharacter.Camel]: "🐪",
  [ECharacter.Llama]: "🦙",
  [ECharacter.Elephant]: "🐘",
  [ECharacter.Mouse]: "🐭",
  [ECharacter.Hamster]: "🐹",
  [ECharacter.Rabbit]: "🐰",
  [ECharacter.Bat]: "🦇",
  [ECharacter.Bear]: "🐻",
  [ECharacter.Koala]: "🐨",
  [ECharacter.Panda]: "🐼",
  [ECharacter.Chicken]: "🐔",
  [ECharacter.HatchingChick]: "🐣",
  [ECharacter.BabyChick]: "🐤",
  [ECharacter.Bird]: "🐦",
  [ECharacter.Penguin]: "🐧",
  [ECharacter.Owl]: "🦉",
  [ECharacter.Dodo]: "🦤",
  [ECharacter.Flamingo]: "🦩",
  [ECharacter.Frog]: "🐸",
  [ECharacter.Snake]: "🐍",
  [ECharacter.Dragon]: "🐲",
  [ECharacter.Sauropod]: "🦕",
  [ECharacter.TRex]: "🦖",
  [ECharacter.Whale]: "🐳",
  [ECharacter.Dolphin]: "🐬",
  [ECharacter.Seal]: "🦭",
  [ECharacter.Fish]: "🐠",
  [ECharacter.Blowfish]: "🐡",
  [ECharacter.Shark]: "🦈",
  [ECharacter.Octopus]: "🐙",
  [ECharacter.Shell]: "🐚",
  [ECharacter.Snail]: "🐌",
  [ECharacter.Butterfly]: "🦋",
  [ECharacter.Bug]: "🐛",
  [ECharacter.Honeybee]: "🐝",
  [ECharacter.Beetle]: "🪲",
  [ECharacter.LadyBeetle]: "🐞",
  [ECharacter.Scorpion]: "🦂",
  [ECharacter.Fly]: "🪰",
  [ECharacter.Worm]: "🪱",
  [ECharacter.Microbe]: "🦠",
  [ECharacter.CherryBlossom]: "🌸",
  [ECharacter.WhiteFlower]: "💮",
  [ECharacter.Rosette]: "🏵️",
  [ECharacter.Rose]: "🌹",
  [ECharacter.WiltedFlower]: "🥀",
  [ECharacter.Hibiscus]: "🌺",
  [ECharacter.Sunflower]: "🌻",
  [ECharacter.Blossom]: "🌼",
  [ECharacter.Tulip]: "🌷",
  [ECharacter.Seedling]: "🌱",
  [ECharacter.PottedPlant]: "🪴",
  [ECharacter.PalmTree]: "🌴",
  [ECharacter.Cactus]: "🌵",
  [ECharacter.Herb]: "🌿",
  [ECharacter.Shamrock]: "☘️",
  [ECharacter.FourLeafClover]: "🍀",
  [ECharacter.MapleLeaf]: "🍁",
  [ECharacter.Mushroom]: "🍄",
  [ECharacter.Crab]: "🦀",
  [ECharacter.Shrimp]: "🦐",
  [ECharacter.Squid]: "🦑",
  [ECharacter.Fire]: "🔥",
  [ECharacter.Rainbow]: "🌈",
  [ECharacter.NewMoon]: "🌚",
  [ECharacter.FullMoon]: "🌝",
  [ECharacter.Sun]: "🌞",
};

const $randomUsername = () =>
  slugify(faker.internet.userName(), { lower: true }).replace(/\./g, "-");

const $randomChar = () => shuffle(Object.keys(Character))?.[0];

const useChatHook = () => {
  const dbRef = useRef<OrbitDB>();
  const [username, setUsername] = useLocalStorage<string>(
    "tvlix-username",
    $randomUsername()
  );
  const [color, setColor] = useLocalStorage<string>(
    "tvlix-color",
    $randomColor()
  );
  const [$char, setChar] = useLocalStorage<string>("tvlix-char", $randomChar());
  const char = useMemo(() => Character[$char], [$char]);
  const [channelId, setChannelId] = useState<string>();
  const [isConnected, setConnectionStatus] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isSettingsVisible, setSettingsVisibility] = useState<boolean>(false);
  const [latestMessage, setLatestMessage] = useState<string>();

  const randomUsername = useCallback(() => {
    setUsername($randomUsername());
  }, []);

  const randomColor = useCallback(() => {
    setColor($randomColor());
  }, []);

  const randomChar = useCallback(() => {
    setChar($randomChar());
  }, []);

  const initIPFS = async () => {
    return await IPFS.create({
      repo:
        "/orbitdb/zdpuAuzhdHD4AJLvGpkNsytvjauy6r9YWZUgsHgQyFQ74E6M2/tvlix-db",
      config: {
        Discovery: {
          MDNS: {
            Enabled: true,
          },
          webRTCStar: {
            Enabled: true,
          },
        },
        Addresses: {
          Swarm: [
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
          ],
        },
      },
    });
  };
  const sendMessage = useCallback(
    async (message: string = "") => {
      if ((message && message.length < 3) || message === latestMessage) {
        return;
      }

      if (dbRef.current) {
        const latestMessage = `${
          message.length > 59 ? message.substr(0, 60) + "..." : message
        }`;

        await dbRef.current.add({
          time: Date.now(),
          username,
          color,
          char,
          message: latestMessage,
        });
        setLatestMessage(latestMessage);
      }
    },
    [username, color, char, latestMessage]
  );

  // Init chat on load
  useEffect(() => {
    if (!process.browser) return;
    setConnectionStatus(false);
    if (!channelId) {
      return;
    }

    const initChat = async () => {
      try {
        if (!(window as IPFSInstance).ipfs) {
          (window as IPFSInstance).ipfs = await initIPFS();
        }

        const orbitdb = await OrbitDB.createInstance(
          (window as IPFSInstance).ipfs
        );
        dbRef.current = await orbitdb.log(`channel-${channelId}`);
        await dbRef.current.load();
        setConnectionStatus(true);

        dbRef.current.events.on(
          "write",
          (address: string, { payload: { value: newChat } }: any) => {
            setChats((chats) => [
              ...chats.reverse().splice(0, 9).reverse(),
              {
                address,
                ...newChat,
              },
            ]);
          }
        );

        // Get latest chat message
        const chats = dbRef.current
          .iterator({ limit: 10 })
          .collect()
          .map((e) => e?.payload?.value ?? {});
        setChats(chats);
      } catch {}
    };
    initChat();
  }, [channelId]);

  return {
    isConnected,
    sendMessage,
    setChannelId,
    chats,
    username,
    color,
    char,
    randomUsername,
    randomColor,
    randomChar,
    isSettingsVisible,
    setSettingsVisibility,
  };
};

const Container = createContainer(useChatHook);

export const useChat = Container.useContainer;

export const ChatProvider = Container.Provider;

export default Container;
