import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";

import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Link from "next/link";

//Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components
import Head from "next/head";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import GrayBackground from "../../../components/GrayBackground";
import Header from "../../../components/Header";
import TermDefinitionCard from "../../../components/TermDefinitonCard";
import { TextField } from "../../../components/TextField";
import { useAuthContext } from "../../../context/Auth";
import { CardType, SetType } from "../../../types";

//prisma
import prismaClient from "../../../util/prismaclient";

interface EditSetProps {
  set?: SetType;
}

const EditSet: NextPage<EditSetProps> = ({ set }) => {
  const { user, userData } = useAuthContext();
  const router = useRouter();
  const [title, setTitle] = useState<string | undefined>(set?.title);
  const [desc, setDesc] = useState<string | undefined>(set?.description);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cards, setCards] = useState<CardType[] | undefined>(set?.card);
  const [deletedCards, setDeletedCards] = useState<CardType[]>([]);

  const [otherSets, setOtherSets] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id != set?.creatorId) {
      router.push("/");
    }
  });

  useEffect(() => {
    const newOtherSet: any[] = [];
    userData?.set?.forEach((setValue) => {
      newOtherSet.push({ value: setValue.id, label: setValue.title });
      setOtherSets(newOtherSet);
    });
    return () => {};
  }, [userData]);

  const handleTermChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCards = [...cards!];
    newCards[index].term = e.target.value;
    setCards(newCards);
  };

  const handleDefinitionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCards = [...cards!];
    newCards[index].definition = e.target.value;
    setCards(newCards);
  };

  const handleAddCard = () => {
    const index = cards!.length;
    const cardsArr = [...cards!];

    const newData = { order: index, setId: set?.id, definition: "", term: "" };
    cardsArr.push(newData);

    setCards(cardsArr);
  };

  const handleDeleteCard = (index: number) => {
    //Return if it's less than 1
    if (cards!.length - 1 < 1) {
      toast.error("???? Can't have less than 1 card1");
      return;
    }
    const newCards: CardType[] = [];
    const deletedCardsArr = [...deletedCards];
    deletedCardsArr.push(cards![index]);

    let order = 0;
    cards?.forEach((card, i) => {
      if (i !== index) {
        newCards.push({
          term: card.term,
          definition: card.definition,
          order: order,
          id: card.id,
          setId: card.setId,
        });
        order += 1;
      }
    });
    setDeletedCards([...deletedCardsArr]);
    setCards([...newCards]);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    //Title must not be empty
    if (title == "") {
      toast.info("???? Title of the set cannot be empty");
      return;
    }

    //Cards must not be empty
    let filled = true;
    for (let i = 0; i < cards!.length; i++) {
      if (cards![i].term == "" || cards![i].definition == "") {
        toast.info("???? Make sure you fill every card");
        filled = false;
      }
      if (!filled) break;
    }
    if (!filled) return;
    //Take newely added cards only

    setButtonDisabled(true);

    //Update set
    await axios.post("/api/set/update", {
      id: set?.id,
      title,
      description: desc,
    });

    //Delete cards
    if (deletedCards.length > 0) {
      await axios.delete("/api/card", { data: deletedCards });
    }

    //Add new cards

    await axios.post("/api/card", { newCards: cards });

    //Update cards
    await axios.put("/api/card", {
      cards,
      currentSetId: set?.id,
    });

    toast.success("???? Changes has been saved");
    setButtonDisabled(false);
  };

  const handleReorderUpwards = (index: number) => {
    console.log(index);
    if (index - 1 < 0) return;
    const cardsArr = [...cards!];

    //Upper card order will increment, bottom card order will decrement
    const upperCard = cardsArr[index - 1];
    upperCard.order = index;
    const bottomCard = cardsArr[index];
    bottomCard.order = index - 1;

    //Set the new card array value
    cardsArr[index] = upperCard;
    cardsArr[index - 1] = bottomCard;

    //Set the new value
    setCards(cardsArr);
  };

  const handleReorderDownwards = (index: number) => {
    console.log(index);
    if (index + 1 >= cards!.length) return;
    const cardsArr = [...cards!];

    const upperCard = cardsArr[index];
    upperCard.order = index + 1;
    const bottomCard = cardsArr[index + 1];
    bottomCard.order = index;

    //Set the new card array value
    cardsArr[index + 1] = upperCard;
    cardsArr[index] = bottomCard;

    //Set the new value
    setCards(cardsArr);
  };

  return (
    <div>
      <Head>
        <title>Studify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-center" autoClose={3000} />
      <GrayBackground />
      <Header />
      <div className="px-9 mt-4 mb-8 flex flex-col space-y-4">
        <Link href={`/set/${set?.id}`} passHref>
          <a className="bg-gray-700 hover:bg-gray-900 transition-colors ease-in-out duration-200 rounded-lg px-4 py-2 text-white flex w-min">
            Start
          </a>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  space-y-8 mb-14"
        >
          <div className="flex space-x-4 md:space-x-12">
            <TextField
              className="text-lg md:text-3xl"
              label="Title"
              placeholder="Study Set Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              className="text-lg md:text-3xl"
              label="Description"
              placeholder="Description"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-4">
            {cards!.map((card, i) => {
              return (
                <TermDefinitionCard
                  key={card.id}
                  term={card.term}
                  defintion={card.definition}
                  deleteButtonOnClick={() => handleDeleteCard(i)}
                  termOnChange={(e) => handleTermChange(e, i)}
                  definitionOnChange={(e) => handleDefinitionChange(e, i)}
                  upButtonOnClick={() => handleReorderUpwards(i)}
                  downButtonOnClick={() => handleReorderDownwards(i)}
                  edit
                  options={otherSets}
                  setIdOnChange={(val) => {
                    const cardsArr = [...cards!];
                    cardsArr[i].setId = val?.value;
                    setCards(cardsArr);
                  }}
                  set={set}
                />
              );
            })}
          </div>
          <Card className="p-5">
            <div
              onClick={handleAddCard}
              className="border-2 text-lg font-medium cursor-pointer transition-colors ease-in-out duration-200 text-accent-600 hover:text-primary-400 flex items-center justify-center border-accent-600 rounded-md border-dashed  w-full h-full p-14"
            >
              Add Card
            </div>
          </Card>
          <Button
            disabled={buttonDisabled}
            type="submit"
            className={` p-4 rounded-xl text-white ${
              buttonDisabled ? "bg-gray-500" : "bg-green"
            }`}
          >
            {buttonDisabled ? <>Saving</> : <>Save</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string;
  const set = await prismaClient.set.findUnique({
    where: { id: slug },
    select: {
      card: {
        orderBy: {
          order: "asc",
        },
      },
      description: true,
      id: true,
      title: true,
      creatorId: true,
      user: { select: { id: true } },
    },
  });
  return { props: { set } };
};

export default EditSet;
