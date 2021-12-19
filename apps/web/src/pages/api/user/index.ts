import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    res.json(user);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
