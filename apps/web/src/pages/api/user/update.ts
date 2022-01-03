import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/put
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, firstName, lastName } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          firstName,
          lastName,
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
