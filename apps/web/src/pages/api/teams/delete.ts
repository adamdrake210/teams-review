import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/delete
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamId } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const deleteTeam = prisma.team.delete({
        where: {
          id: teamId,
        },
      });

      res.json(deleteTeam);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    return Promise.reject(error);
  } finally {
    await prisma.$disconnect();
  }
}
