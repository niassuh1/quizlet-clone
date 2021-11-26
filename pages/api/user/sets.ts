import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  const userSets = await prismaClient.set.findMany({
    where: { creatorId: userId },
    select: {
      card: true,
      creatorId: true,
      description: true,
      id: true,
      title: true,
    },
  });

  res.send(userSets);
};

export default handler;
