import { FC, MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  onClick?: MouseEventHandler;
  Icon: IconType;
  size?: string | number;
}

/**
 * Button used for react-icons
 * @param {IconType} icon
 */
const IconButton: FC<IconButtonProps> = ({ Icon, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className="fle hover:bg-accent-400 active:bg-accent-500 self-start text-lg  p-2 rounded-md transition-colors ease-in-out duration-200"
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
