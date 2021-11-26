import { FC, MouseEventHandler, useEffect, useState } from "react";
import { CardType } from "../types";
import _, { shuffle } from "lodash";
import IconButton from "./IconButton";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface LearnCardsProps {
  cards?: CardType[];
}

const LearnCards: FC<LearnCardsProps> = ({ cards }) => {
  const [page, setPage] = useState(0);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
    //Shuffle original card
    const cardsArr = shuffle([...cards!]);

    //Set an options array and push answer
    const optionsArr: any[] = [];
    optionsArr.push(cards![page].definition);
    //Add options to the array
    for (let i = 1; i < cards!.length; i++) {
      if (cardsArr[i].definition !== optionsArr[0])
        optionsArr.push(cardsArr[i].definition);
      if (optionsArr.length > 3) break;
    }
    //Shuffle the array
    setOptions(shuffle(optionsArr));

    return () => {};
  }, [cards, page]);

  const handleBack = () => {
    if (page - 1 < 0) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page + 1 >= cards!.length) return;
    setPage(page + 1);
  };

  return (
    <div className="bg-white flex flex-col shadow-lg p-6 space-y-3">
      <h1 className="font-medium text-lg">{cards![page].term}</h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {options.map((option, i) => {
          return (
            <OptionBox
              key={option}
              option={option}
              selected={i == selectedIndex}
              onClick={() => setSelectedIndex(i)}
              answer={cards![page].definition}
            />
          );
        })}
      </div>
      <div className="flex space-x-4 justify-center">
        <IconButton
          onClick={handleBack}
          className={"hover:bg-gray-300"}
          Icon={MdChevronLeft}
        />
        <IconButton
          onClick={handleNext}
          className="hover:bg-gray-300"
          Icon={MdChevronRight}
        />
      </div>
      <div className="p-1">
        {page + 1}/{cards?.length}
      </div>
    </div>
  );
};

interface OptionCardProps {
  onClick?: MouseEventHandler;
  option?: string;
  selected?: boolean;
  answer?: string;
}

const OptionBox: FC<OptionCardProps> = ({
  onClick,
  option,
  selected,
  answer,
}) => {
  return (
    <div
      className={`p-2 flex items-center border ${
        selected
          ? answer == option
            ? "border-darkGreen bg-green bg-opacity-10"
            : "border-red-600 bg-red-700 bg-opacity-10"
          : "border-gray-300 hover:bg-gray-100 active:bg-gray-200"
      }
   transition-colors ease-in text-sm select-none cursor-pointer rounded-lg`}
      key={option}
      onClick={onClick}
    >
      {option}
    </div>
  );
};

export default LearnCards;
