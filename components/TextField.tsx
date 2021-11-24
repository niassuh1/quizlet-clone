import {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  useState,
} from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Button from "./Button";

interface TextFieldProps {
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  className?: string;
  value?: string | number | readonly string[];
}

export const TextField: FC<TextFieldProps> = ({
  placeholder,
  onChange,
  label,
  type,
  className,
  value,
}) => {
  return (
    <div
      className={`w-full flex flex-col border-b-2 pb-1 border-primary-500 ${className}`}
    >
      <label
        className="flex-grow text-xs font-semibold select-none"
        htmlFor={label?.toLocaleLowerCase()}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="outline-none w-full bg-transparent"
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

interface PasswordFieldProps {
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler;
  showVisibilityButton?: boolean;
}

export const PassowrdField: FC<PasswordFieldProps> = ({
  placeholder,
  onChange,
  label,
  showVisibilityButton = true,
}) => {
  const [showPassword, setShowPassowrd] = useState(false);
  const togglePassowrd: MouseEventHandler = () => {
    setShowPassowrd(!showPassword);
  };
  return (
    <div className="text-sm w-full flex flex-col border-b-2 pb-1 border-primary-500">
      <label className="flex-grow text-xs font-semibold" htmlFor="password">
        {label}
      </label>
      <div className="flex justify-between items-center">
        <input
          placeholder={placeholder}
          className="outline-none w-full"
          type={showPassword ? "text" : "password"}
          onChange={onChange}
        />

        {showVisibilityButton && (
          <div
            onClick={togglePassowrd}
            className="transition-transform ease-in-out active:scale-75 cursor-pointer"
          >
            {showPassword ? (
              <MdVisibilityOff size={15} />
            ) : (
              <MdVisibility size={15} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
