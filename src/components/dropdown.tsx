import { FC, useState, MouseEvent } from "react";
import {
  BiChevronDown as ArrowDownIcon,
  BiChevronRight as ArrowRightIcon,
} from "react-icons/bi";
import cx from "classnames";
import ClickOutside from "react-click-outside";

type DropdownItem = {
  id: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
};

type DropdownProps = {
  selectLabel?: string;
  items: DropdownItem[];
  grid?: number;
};

const Dropdown: FC<DropdownProps> = ({
  selectLabel = "options",
  items = [],
  grid = 0,
}) => {
  const [isDropdownVisible, setDropdownVisibility] = useState<boolean>(false);
  return (
    <ClickOutside onClickOutside={() => setDropdownVisibility(false)}>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-xl shadow-sm px-4 py-2 text-gray-300 hover:text-gray-200 focus:text-gray-200 focus:ring-mirage-300 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setDropdownVisibility((isVisible) => !isVisible)}
          >
            {selectLabel}
            {isDropdownVisible && <ArrowRightIcon className="ml-1" />}
            {!isDropdownVisible && <ArrowDownIcon className="ml-1" />}
          </button>
        </div>

        {isDropdownVisible && (
          <div
            className={cx(
              "text-sm absolute rounded-md shadow-xl text-white bg-mirage-500 ring-1 ring-black ring-opacity-5",
              {
                "left-0 origin-top-left": !grid,
                "right-0 origin-top-right w-96": grid > 0,
              }
            )}
          >
            <div
              className={cx("py-1", {
                [`grid grid-cols-${grid}`]: grid > 0,
              })}
              role="menu"
              aria-labelledby="options-menu"
            >
              {items.map(({ label, id, isSelected, onClick = () => {} }) => {
                const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  onClick();
                  setDropdownVisibility(false);
                };
                return (
                  <a
                    key={`menu-${id}`}
                    href="#"
                    className={cx("block px-4 py-2", {
                      "text-gray-100": isSelected,
                      "text-gray-500 hover:text-gray-100": !isSelected,
                    })}
                    role="menuitem"
                    onClick={handleClick}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default Dropdown;
