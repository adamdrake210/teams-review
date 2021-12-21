import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// PUT /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, firstName, lastName, email, position, teamId, joined } =
    req.body.data;

  try {
    const session = await getSession({ req });
    if (session) {
      const result = await prisma.teamMember.update({
        where: {
          id: id,
        },
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
