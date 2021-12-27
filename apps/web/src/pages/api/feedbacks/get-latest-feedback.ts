import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

// GET /api/feedbacks/get-latest-feedbacks
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const feedback = await prisma.teamMember.findMany({
      where: {
        manager: {
          email: session?.user?.email,
        },
      },
      select: {
        firstName: true,
        lastName: true,
        feedback: {
          select: {
            yearOfFeedback: true,
            monthlyFeedback: {
              select: {
                feedbackId: true,
                feedback: true,
                month: true,
                updatedAt: true,
              },
              take: 3,
              orderBy: {
                updatedAt: "desc",
              },
            },
          },
          take: 3,
        },
      },
    });
    res.json(feedback);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
