import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, description, cards } = req.body;
    await prismaClient.set.create({
      data: { title, description, card: { createMany: { data: cards } } },
    });
  }
};

export default handler;
