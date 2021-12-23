import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, feedback } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.monthlyFeedback.update({
        where: {
          id: id,
        },
        data: {
          feedback,
        },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);

    res.status(500);
    res.json({ error: "Sorry unable to save this information to database" });
  } finally {
    await prisma.$disconnect();
  }
}
