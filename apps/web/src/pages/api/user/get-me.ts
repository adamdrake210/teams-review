import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// GET /api/user
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          teams: true,
          employees: true,
        },
      });
      res.json(user);
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
