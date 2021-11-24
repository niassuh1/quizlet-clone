import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  type?: "button" | "reset" | "submit";
}

const Button: FC<ButtonProps> = ({ children, className, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className={` ${className}`}>
      {children}
    </button>
  );
};

export default Button;
