import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../util/prismaclient";
import supabase from "../../../util/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({});
};

export default handler;
