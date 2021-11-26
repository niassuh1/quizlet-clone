import { FC, useState } from "react";
import { CardType } from "../types";

interface StudyCardProps {
  card?: CardType;
}

const FlashCard: FC<StudyCardProps> = ({ card }) => {
  const [flip, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flip)}
      className={`bg-white flex w-full h-[300px] shadow-lg drop-shadow-sm items-center justify-center
        transition-transform ease-in-out origin-center
            p-8 active:scale-110 cursor-pointer
      `}
    >
      {flip ? (
        <p className="text-lg md:text-2xl">{card?.definition}</p>
      ) : (
        <p className="font-medium text-lg md:text-2xl">{card?.term}</p>
      )}
    </div>
  );
};

export default FlashCard;
