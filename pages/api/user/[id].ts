import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const userInfo = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    include: { set: true },
  });
  res.send({
    id: userInfo?.id,
    name: userInfo?.name,
    email: userInfo?.email,
    set: userInfo?.set,
  });
};

export default handler;
