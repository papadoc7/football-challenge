import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../../db";

interface CreatePlayerRequest extends NextApiRequest {
  body: { name: string };
}

export default async function handler(
  req: CreatePlayerRequest,
  res: NextApiResponse<{ playerId: number } | { message: string }>
) {
  const db = await openDb();
  if (req.method === 'POST') {
    const { name } = req.body;
    const result = await db.run('INSERT INTO players (name) VALUES (?)', name);
    res.status(201).json({ playerId: result.lastID });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
