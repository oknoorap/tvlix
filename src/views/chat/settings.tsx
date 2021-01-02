import cx from "classnames";
import {
  BsFillGearFill as SettingsIcon,
  BsFillPersonFill as PersonIcon,
  BsChat as ChatIcon,
} from "react-icons/bs";
import {
  MdColorLens as ColorIcon,
  MdInsertEmoticon as CharIcon,
} from "react-icons/md";

import { useChat } from "hooks/use-chat";
import RandomButton from "components/random-btn";

const ChatSettingsButton = () => {
  const {
    username,
    color,
    char,
    isSettingsVisible,
    setSettingsVisibility,
    randomUsername,
    randomColor,
    randomChar,
  } = useChat();
  return (
    <>
      {isSettingsVisible && (
        <div className="absolute bottom-0 left-0 w-full mb-12 bg-white rounded-lg shadow-2xl">
          <div className="p-4 text-gray-600">
            <div className="mb-2 flex items-center font-bold">
              <ChatIcon className="fill-current mr-2" />
              <span className="text-gray-800">Chat Settings</span>
            </div>
            <div className="mb-2 text-sm">
              <div className="font-bold flex items-center">
                <PersonIcon className="fill-current mr-1" /> username
              </div>
              <div className="flex items-center">
                <span className="text-xs">{username}</span>
                <RandomButton onClick={randomUsername} />
              </div>
            </div>
            <div className="mb-2 text-sm">
              <div className="font-bold flex items-center">
                <ColorIcon className="fill-current mr-1" /> color
              </div>
              <div className="flex items-center">
                <div
                  className="w-4 h-4 border border-gray-500"
                  style={{ backgroundColor: color }}
                />
                <RandomButton onClick={randomColor} />
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold flex items-center">
                <CharIcon className="fill-current mr-1" /> character
              </div>
              <div className="flex items-center">
                <span>{char}</span>
                <RandomButton onClick={randomChar} />
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        className="absolute focus:outline-none active:outline-none flex items-center justify-center top-0 right-0 rounded-full p-2 mt-1 mr-1"
        onClick={() => setSettingsVisibility((isVisible) => !isVisible)}
      >
        <SettingsIcon
          className={cx("fill-current", {
            "text-gray-600": !isSettingsVisible,
            "text-white": isSettingsVisible,
          })}
        />
      </button>
    </>
  );
};

export default ChatSettingsButton;
