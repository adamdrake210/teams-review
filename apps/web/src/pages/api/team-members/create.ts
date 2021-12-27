import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { MONTH_ARRAY } from "@/constants/constants";

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, position, teamId, joined } =
    req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.teamMember.create({
        data: {
          firstName,
          lastName,
          email,
          position,
          team: {
            connect: { id: teamId },
          },
          joined,
          manager: { connect: { email: session?.user?.email } },
          feedback: {
            create: {
              yearOfFeedback: new Date().getFullYear(),
              monthlyFeedback: {
                create: MONTH_ARRAY,
              },
            },
          },
        },
        include: {
          feedback: true,
        },
      });

      res.json(result);
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
