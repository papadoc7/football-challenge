import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "@/db";

interface TeamStats {
  name: string;
  games_played: number;
  wins: number;
  losses: number;
  draws: number;
  win_ratio: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamStats[] | { message: string }>
) {
  const db = await openDb();

  const teams = await db.all<TeamStats[]>(`
    SELECT 
      teams.name,
      COUNT(games.id) AS games_played,
      SUM(CASE WHEN games.team_1_id = teams.id AND games.final_score_team_1 > games.final_score_team_2 THEN 1
            WHEN games.team_2_id = teams.id AND games.final_score_team_2 > games.final_score_team_1 THEN 1
            ELSE 0 END) AS wins,
      SUM(CASE WHEN games.team_1_id = teams.id AND games.final_score_team_1 < games.final_score_team_2 THEN 1
            WHEN games.team_2_id = teams.id AND games.final_score_team_2 < games.final_score_team_1 THEN 1
            ELSE 0 END) AS losses,
      SUM(CASE WHEN games.final_score_team_1 = games.final_score_team_2 THEN 1 ELSE 0 END) AS draws,
      SUM(CASE WHEN games.team_1_id = teams.id THEN games.final_score_team_1
            WHEN games.team_2_id = teams.id THEN games.final_score_team_2
            ELSE 0 END) AS goals_for,
      SUM(CASE WHEN games.team_1_id = teams.id THEN games.final_score_team_2
            WHEN games.team_2_id = teams.id THEN games.final_score_team_1
            ELSE 0 END) AS goals_against
    FROM teams
    LEFT JOIN games ON teams.id IN (games.team_1_id, games.team_2_id)
    GROUP BY teams.id
  `);

  const teamStats = teams.map((team) => ({
    ...team,
    win_ratio: team.games_played > 0 ? team.wins / team.games_played : 0,
    goal_difference: team.goals_for - team.goals_against,
  }));

  res.status(200).json(teamStats);
}
