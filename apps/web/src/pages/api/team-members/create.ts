import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, position, team, joined } = req.body.data;

  console.log("req.body: ", req.body);

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
            connect: { id: team },
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
    res.json({ error: "Sorry unable to save sighting to database" });
  } finally {
    await prisma.$disconnect();
  }
}
