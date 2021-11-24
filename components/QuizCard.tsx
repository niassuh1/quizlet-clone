import { FC, Key } from "react";
import Button from "./Button";
import { MdNote } from "react-icons/md";
import Link from "next/link";

interface QuizCardProps {
  title?: string;
  amount?: number | string;
  description?: string;
  creatorName?: string;
  key?: Key;
  id?: string;
}

const QuizCard: FC<QuizCardProps> = ({
  amount,
  creatorName,
  description,
  title,
  key,
  id,
}) => {
  return (
    <div
      key={key}
      className="flex flex-col max-w-screen-md box-border bg-white drop-shadow-sm shadow-lg transition-all ease-in-out duration-200 p-6 space-y-4 hover:shadow-xl hover:scale-[1.01]"
    >
      <div className="flex justify-between">
        <h1 className="flex items-center space-x-2">
          <MdNote size={12} />
          <span className="uppercase text-[13px] font-medium tracking-widest">
            {title}
          </span>
        </h1>
        <h2 className="text-[11px] font-medium text-primary-400 uppercase tracking-widest">
          {amount} Cards
        </h2>
      </div>
      <p className="flex-1 text-sm text-accent-500 overflow-ellipsis">
        {description}
      </p>
      <Link href={`/set/${id}`} passHref>
        <a href="">
          <Button className="bg-primary-500 uppercase tracking-[0.15em] text-xs text-white px-4 py-3 rounded-lg self-start active:bg-primary-300 transition-colors ease-in-out duration-[150ms]">
            Start
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default QuizCard;
