import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={` ${className}`}>
      {children}
    </button>
  );
};

export default Button;
