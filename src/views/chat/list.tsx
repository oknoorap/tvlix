import cx from "classnames";

import { useChat } from "hooks/use-chat";

import styles from "./chat.module.scss";

const ChatList = () => {
  const { chats } = useChat();

  return (
    <div className="w-56 mb-4">
      {chats.map(({ username, char, color, message }, index) => {
        const transparentsChatClassName =
          chats.length > 7
            ? {
                "opacity-80": index === 4,
                "opacity-70": index === 3,
                "opacity-50": index === 2,
                "opacity-40 select-none": index === 1,
                "opacity-10 select-none": index === 0,
              }
            : {};

        return (
          <div
            className={cx(
              "text-white leading-tight",
              styles["text-shadow"],
              transparentsChatClassName
            )}
            key={`chat-${index}`}
          >
            <span className="mr-2 text-sm">
              <span className="mr-1">{char}</span>{" "}
              <strong style={{ color }}>{username}</strong>
            </span>
            <span className="text-xs">{message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
