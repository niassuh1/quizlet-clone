import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, cards, creatorId } = req.body;
  const set = await prismaClient.set.create({
    data: {
      title,
      description,
      creatorId,
      card: { createMany: { data: cards } },
    },
  });
  res.status(200).send({ set });
};

export default handler;
