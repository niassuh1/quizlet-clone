import { FC } from "react";
import Button from "./Button";
import { MdNote } from "react-icons/md";

interface QuizCardProps {
  title?: string;
  amount?: number | string;
  description?: string;
  creatorName?: string;
}

const QuizCard: FC<QuizCardProps> = ({
  amount,
  creatorName,
  description,
  title,
}) => {
  return (
    <div className="flex flex-col h-auto max-w-screen-md bg-white drop-shadow-sm shadow-lg transition-all ease-in-out duration-200 p-6 space-y-6 hover:shadow-xl hover:scale-[1.01]">
      <div className="flex justify-between">
        <h1 className="flex items-center space-x-2">
          <MdNote />
          <span className="uppercase text-sm font-medium tracking-widest">
            {title}
          </span>
        </h1>
        <h2>{amount} Cards</h2>
      </div>
      <p className="flex-1 text-sm text-accent-500">{description}</p>
      <Button className="bg-primary-500 uppercase tracking-[0.15em] text-xs text-white px-4 py-3 rounded-lg self-start active:bg-primary-300 transition-colors ease-in-out duration-[150ms]">
        Start
      </Button>
    </div>
  );
};

export default QuizCard;
