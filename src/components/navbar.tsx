import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBroadcast as ChannelListIcon } from "react-icons/bi";
import cx from "classnames/dedupe";

import Logo from "assets/svg/logo.svg?sprite";

type NavbarProps = {
  align?: string;
  withBg?: boolean;
};

const Navbar: FC<NavbarProps> = ({
  children,
  align = "start",
  withBg = false,
}) => {
  const { pathname } = useRouter();
  const href = pathname === "/" ? "/view-channels" : "/";
  const textlink = pathname === "/" ? "View Channels" : "Random Channels";

  return (
    <div
      className={cx("fixed top-0 left-0 w-full z-50", {
        "bg-mirage-500 shadow": withBg,
      })}
    >
      <div className={cx("flex p-4", `items-${align}`)}>
        <div className="flex justify-between mr-2">
          <div className="flex flex-col justify-center items-center">
            <Link href="/" passHref>
              <a>
                <Logo className="w-32 h-auto" />
              </a>
            </Link>
            <Link href={href} passHref>
              <a className="flex items-center text-sm font-bold text-white">
                <ChannelListIcon className="w-4 h-4 mr-1 cursor-pointer" />
                <span>{textlink}</span>
              </a>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
