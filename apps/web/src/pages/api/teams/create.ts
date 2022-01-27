import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description } = req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.team.create({
        data: {
          title,
          description,
          manager: { connect: { email: session?.user?.email } },
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
