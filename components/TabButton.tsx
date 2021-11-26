import { FC, MouseEventHandler } from "react";
import Button from "./Button";

interface TabButtonProps {
  onClick?: MouseEventHandler;
  selected?: boolean;
}

const TabButton: FC<TabButtonProps> = ({
  children,
  onClick,
  selected = false,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center space-x-2 p-2 rounded-lg ${
        selected ? "bg-accent-500" : " hover:bg-accent-400 active:bg-accent-600"
      }  transition-colors ease-in-out duration-200`}
    >
      {children}
    </Button>
  );
};

export default TabButton;
