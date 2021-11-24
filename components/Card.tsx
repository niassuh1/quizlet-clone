import { FC } from "react";

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`flex bg-white shadow-md ${className}`}>{children}</div>
  );
};

export default Card;
