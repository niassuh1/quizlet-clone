import React, { ChangeEventHandler, FC, Key, MouseEventHandler } from "react";
import { MdDelete, MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";
import Card from "./Card";
import IconButton from "./IconButton";
import { TextField } from "./TextField";
import Select, { ActionMeta, SingleValue } from "react-select";
import { SetType } from "../types";

interface TermDefinitionCardProps {
  deleteButtonOnClick?: MouseEventHandler;
  upButtonOnClick?: MouseEventHandler;
  downButtonOnClick?: MouseEventHandler;
  termOnChange?: ChangeEventHandler<HTMLInputElement>;
  term?: string;
  definitionOnChange?: ChangeEventHandler<HTMLInputElement>;
  defintion?: string;
  key?: Key;
  edit?: boolean;

  setIdOnChange?: (
    newValue: SingleValue<{
      value: string | undefined;
      label: string | undefined;
    }>,
    actionMeta: ActionMeta<{
      value: string | undefined;
      label: string | undefined;
    }>
  ) => void;
  set?: SetType;
  options?: any[];
}

const TermDefinitionCard: FC<TermDefinitionCardProps> = ({
  termOnChange,
  term,
  definitionOnChange,
  defintion,
  deleteButtonOnClick,
  downButtonOnClick,
  upButtonOnClick,
  key,
  edit = false,
  options,
  setIdOnChange,
  set,
}) => {
  console.log(options);
  return (
    <Card key={key} className="p-5 flex-col space-y-2">
      {edit ? (
        <div className="flex flex-col">
          <h1 className="text-sm font-medium">Move to other set</h1>
          <Select
            defaultValue={{ value: set?.id, label: set?.title }}
            className="w-full"
            placeholder="Move To Another Study Set"
            options={options}
            onChange={setIdOnChange}
          />
        </div>
      ) : (
        <></>
      )}
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
