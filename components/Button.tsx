import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${className} transition-colors ease-in-out duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
