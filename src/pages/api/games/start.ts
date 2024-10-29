import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../../db";

interface StartGameRequest extends NextApiRequest {
  body: {
    team_1_id: number;
    team_2_id: number;
    date_played: string;
  };
}

export default async function handler(
  req: StartGameRequest,
  res: NextApiResponse<{ gameId: number } | { message: string }>
) {
  const db = await openDb();
  if (req.method === "POST") {
    const { team_1_id, team_2_id, date_played } = req.body;
    const result = await db.run(
      "INSERT INTO games (team_1_id, team_2_id, date_played) VALUES (?, ?, ?)",
      team_1_id,
      team_2_id,
      date_played
    );
    res.status(201).json({ gameId: result.lastID });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
