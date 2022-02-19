import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

// GET /api/feedbacks/get-latest-feedbacks
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    if (session) {
      const feedback = "get-one";
      res.json(feedback);
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
