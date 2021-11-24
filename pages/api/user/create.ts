import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, id } = req.body;
  await prismaClient.user.create({ data: { email, name, id } });
};

export default handler;
