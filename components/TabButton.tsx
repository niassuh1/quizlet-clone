import { FC } from "react";
import Button from "./Button";

const TabButton: FC = ({ children }) => {
  return (
    <Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent-400 active:bg-accent-500 transition-colors ease-in-out duration-200">
      {children}
    </Button>
  );
};

export default TabButton;
