import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";
import supabase from "../../../util/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, description } = req.body;
  try {
    const update = await prismaClient.set.update({
      data: {
        title,
        description,
      },
      where: {
        id,
      },
    });
    res.status(200).send(update);
  } catch {
    res.send({ error: "Error updating" });
  }
};

export default handler;
