import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, positiveFeedback, negativeFeedback } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.monthlyFeedback.update({
        where: {
          id: id,
        },
        data: {
          positiveFeedback,
          negativeFeedback,
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
