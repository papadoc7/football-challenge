import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "@/db";

interface TeamStats {
  name: string;
  games_played: number;
  wins: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamStats[] | { message: string }>,
) {
  const db = await openDb();
  const teams = await db.all<TeamStats[]>(`
    SELECT teams.name,
        COUNT(games.id) AS games_played,
        SUM(CASE WHEN games.final_score_team_1 > games.final_score_team_2 THEN 1 ELSE 0 END) AS wins
    FROM teams
    LEFT JOIN games ON teams.id IN (games.team_1_id, games.team_2_id)
    GROUP BY teams.id
  `);
  res.status(200).json(teams);
}
