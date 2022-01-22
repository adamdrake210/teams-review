import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/delete
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamMemberId } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const deleteMonthlyFeedback = prisma.monthlyFeedback.deleteMany({
        where: {
          teamMemberId,
        },
      });

      const deleteTeamMember = prisma.teamMember.delete({
        where: {
          id: teamMemberId,
        },
      });

      const transaction = await prisma.$transaction([
        deleteMonthlyFeedback,
        deleteTeamMember,
      ]);
      res.json(transaction);
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
