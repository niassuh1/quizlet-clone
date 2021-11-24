import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await prismaClient.card.deleteMany({ where: { setId: id } });
      await prismaClient.set.delete({ where: { id: id } });
      res.status(200).send({ message: "Successfully deleted" });
    } catch (e) {
      res.status(400).send({ message: "An error has occured" });
    }
  }
};

export default handler;
