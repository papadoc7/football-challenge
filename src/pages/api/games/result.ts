import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../../db";

export default async function getGameResult(req: NextApiRequest, res: NextApiResponse) {
  const { team_1_id, team_2_id } = req.query;

  if (!team_1_id || !team_2_id) {
    return res.status(400).json({ message: "Team IDs are required" });
  }

  const db = await openDb();
  try {
    const result = await db.get(
      `
        SELECT g.team_1_id, g.team_2_id, g.final_score_team_1, g.final_score_team_2, g.date_played,
               t1.name AS team_1_name, t2.name AS team_2_name
        FROM games g
        JOIN teams t1 ON g.team_1_id = t1.id
        JOIN teams t2 ON g.team_2_id = t2.id
        WHERE (g.team_1_id = ? AND g.team_2_id = ?) OR (g.team_1_id = ? AND g.team_2_id = ?)
      `,
      [team_1_id, team_2_id, team_2_id, team_1_id],
    );

    if (!result) {
      return res.status(404).json({ message: "No match result found for the selected teams." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching match result:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
