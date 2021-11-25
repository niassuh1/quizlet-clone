import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //Add new cards
  if (req.method == "POST") {
    const { newCards } = req.body;

    try {
      const addCards = await prismaClient.card.createMany({
        data: newCards,
        skipDuplicates: true,
      });

      res.send(addCards);
    } catch {
      res.send({ error: "An error has occured" });
    }
  }
  //Update existing cards
  else if (req.method == "PUT") {
    const { cards } = req.body;

    try {
      const cardsArr = cards as [];
      cardsArr.forEach(async (card: any) => {
        await prismaClient.card.update({ data: card, where: { id: card.id } });
      });

      res.send({ message: "success" });
    } catch {
      res.send({ error: "Unable to update cards" });
    }
  }
  //Delete cards
  else if (req.method == "DELETE") {
    const deletedCards = req.body as [];

    try {
      deletedCards.forEach(async (card: any) => {
        await prismaClient.card.delete({
          where: {
            id: card.id,
          },
        });
      });
      res.send({ message: "successfully deleted cards" });
    } catch {
      res.send({ error: "An error has occured" });
    }
  }
};

export default handler;
