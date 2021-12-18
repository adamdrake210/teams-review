import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// GET /api/team-members/getmany
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const result = await prisma.teamMember.findMany();
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
