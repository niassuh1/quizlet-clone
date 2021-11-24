import { FC, MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  onClick?: MouseEventHandler;
  Icon: IconType;
  size?: string | number;
  className?: string;
}

/**
 * Button used for react-icons
 * @param {IconType} icon
 */
const IconButton: FC<IconButtonProps> = ({
  Icon,
  onClick,
  size,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex self-start text-lg  p-1 rounded-md transition-colors ease-in-out duration-200 ${className}`}
    >
      <Icon size={size} />
    </div>
  );
};

export default IconButton;
