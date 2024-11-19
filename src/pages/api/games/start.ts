import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../../db";

interface StartGameRequest extends NextApiRequest {
  body: {
    team_1_id: number;
    team_2_id: number;
    date_played: string;
    final_score_team_1: number;
    final_score_team_2: number;
    is_active?: number;
  };
}

export default async function startGame(
  req: StartGameRequest,
  res: NextApiResponse<{ gameId: number } | { message: string }>,
) {
  const db = await openDb();

  if (req.method === "POST") {
    const {
      team_1_id,
      team_2_id,
      date_played,
      final_score_team_1,
      final_score_team_2,
      is_active = 0, // default - match has ended
    } = req.body;

    // Validate all required fields
    if (
      typeof team_1_id !== "number" ||
      typeof team_2_id !== "number" ||
      typeof date_played !== "string" ||
      typeof final_score_team_1 !== "number" ||
      typeof final_score_team_2 !== "number"
    ) {
      return res.status(400).json({ message: "Invalid or missing input fields" });
    }

    try {
      const result = await db.run(
        "INSERT INTO games (team_1_id, team_2_id, date_played, final_score_team_1, final_score_team_2, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        team_1_id,
        team_2_id,
        date_played,
        final_score_team_1,
        final_score_team_2,
        is_active,
      );

      res.status(201).json({ gameId: result.lastID as number });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Failed to start the game" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
