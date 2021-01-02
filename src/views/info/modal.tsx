import { FC } from "react";
import Logo from "assets/svg/logo.svg?sprite";
import { BiCoffeeTogo as CoffeeIcon } from "react-icons/bi";
import { FaEthereum as EthereumIcon } from "react-icons/fa";

type InfoModalProps = {
  onClose?: () => void;
};

const InfoModal: FC<InfoModalProps> = ({ onClose = () => {} }) => {
  const credits = [
    {
      name: "HLS.js",
      description: "JavaScript HLS client using Media Source Extension.",
      link: "https://github.com/video-dev/hls.js/",
    },

    {
      name: "iptv",
      description:
        "Collection of 5000+ publicly available IPTV channels from all over the world.",
      link: "https://github.com/iptv-org/iptv",
    },

    {
      name: "orbit-db",
      description: "Peer-to-Peer Databases for the Decentralized Web.",
      link: "https://github.com/orbitdb/orbit-db",
    },

    {
      name: "js-sha256",
      description:
        "A simple SHA-256 / SHA-224 hash function for JavaScript supports UTF-8 encoding.",
      link: "https://github.com/emn178/js-sha256",
    },
  ];

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-30 bg-black bg-opacity-75 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative bg-white w-1/3 p-6 z-40 rounded-lg text-gray-500">
        <div className="flex flex-col items-center justify-center mb-6">
          <Logo className="w-48 h-auto mb-1" />
          <span className="text-sm">Online TV Streaming Watching Party</span>
        </div>
        <p className="text-sm mb-4">
          TVLiX is an open source project made by{" "}
          <a
            href="https://twitter.com/oknoorap"
            target="_blank"
            rel="noopener"
            className="font-semibold text-blue-400"
          >
            @oknoorap
          </a>
          . If you were entertained by this website, plase submit feedback or
          request a feature via{" "}
          <a
            href="https://github.com/oknoorap/tvlix"
            target="_blank"
            rel="noopener"
            className="underline hover:no-underline"
          >
            Github
          </a>
          .
        </p>
        <p className="flex items-center text-sm mb-1">
          Buy me a <CoffeeIcon className="fill-current w-4 h-4 text-red-800" />{" "}
          coffee via ETH:
        </p>
        <p className="select-all bg-gray-100 text-red-700 py-1 px-2 flex items-center mb-6">
          <EthereumIcon className="inline fill-current text-purple-700 mr-1" />{" "}
          0xab1c4e446900ad20bf5fae1be67f87d54dacd2f0
        </p>
        <h3 className="text-lg font-bold underline mb-2">Thanks to</h3>
        <div className="py-2 px-4 bg-gray-100 h-48 overflow-auto">
          {credits.map(({ name, link, description }, index) => (
            <div className="mb-4 last:mb-0" key={`credit-${index}`}>
              <div className="font-bold">{name}</div>
              <div className="text-sm text-gray-500">{description}</div>
              <a
                href={link}
                rel="noopener"
                target="_blank"
                className="text-red-700 underline"
              >
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
