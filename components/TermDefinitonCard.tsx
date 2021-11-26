import React, { ChangeEventHandler, FC, Key, MouseEventHandler } from "react";
import { MdDelete, MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";
import Card from "./Card";
import IconButton from "./IconButton";
import { TextField } from "./TextField";

interface TermDefinitionCardProps {
  deleteButtonOnClick?: MouseEventHandler;
  upButtonOnClick?: MouseEventHandler;
  downButtonOnClick?: MouseEventHandler;
  termOnChange?: ChangeEventHandler<HTMLInputElement>;
  term?: string;
  defintion?: string;
  definitionOnChange?: ChangeEventHandler<HTMLInputElement>;
  key?: Key;
}

const TermDefinitionCard: FC<TermDefinitionCardProps> = ({
  termOnChange,
  definitionOnChange,
  deleteButtonOnClick,
  downButtonOnClick,
  key,
  upButtonOnClick,
  term,
  defintion,
}) => {
  return (
    <Card
      key={key}
      className="p-5 flex-col space-y-2 transition-all ease-in-out duration-500"
    >
      <div className="flex justify-between items-center space-x-3">
        <MdMenu />
        <div className="space-y-2">
          <IconButton
            className="text-accent-600 hover:bg-accent-300 hover:text-primary-400 active:bg-accent-400 "
            Icon={MdExpandLess}
            onClick={upButtonOnClick}
          />
          <IconButton
            className="text-accent-600 hover:bg-accent-300 hover:text-primary-400 active:bg-accent-400 "
            Icon={MdExpandMore}
            onClick={downButtonOnClick}
          />
        </div>
      </div>

      <div className="flex space-x-5 ">
        <TextField
          className="md:text-2xl"
          label="Term"
          placeholder="Term"
          type="text"
          onChange={termOnChange}
          value={term}
        />
        <TextField
          className="md:text-2xl"
          label="Definition"
          placeholder="Definition"
          type="text"
          onChange={definitionOnChange}
          value={defintion}
        />
      </div>

      <IconButton
        className="text-accent-600 hover:bg-accent-300 hover:text-primary-400 active:bg-accent-400 self-end"
        Icon={MdDelete}
        onClick={deleteButtonOnClick}
      />
    </Card>
  );
};

export default TermDefinitionCard;
