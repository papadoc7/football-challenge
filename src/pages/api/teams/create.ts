import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "@/db";

interface CreateTeamRequest extends NextApiRequest {
  body: { name: string };
}

export default async function handler(
  req: CreateTeamRequest,
  res: NextApiResponse<{ teamId: number } | { message: string }>
) {
  const db = await openDb();
  // console.log({db});

  if (req.method === "POST") {
    const { name } = req.body;
    const result = await db.run("INSERT INTO teams (name) VALUES (?)", name);
    res.status(201).json({ teamId: result.lastID });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
