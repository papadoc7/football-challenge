import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

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

interface TeamStatsTableProps {
  teams: TeamStats[];
}

export default function TeamStatsTable({ teams }: TeamStatsTableProps) {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 800, margin: "auto", mt: 3 }}>
      <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
        Team Statistics
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Team/Player Name</strong></TableCell>
            <TableCell align="right"><strong>Games Played</strong></TableCell>
            <TableCell align="right"><strong>Wins</strong></TableCell>
            <TableCell align="right"><strong>Losses</strong></TableCell>
            <TableCell align="right"><strong>Draws</strong></TableCell>
            <TableCell align="right"><strong>Win Ratio (%)</strong></TableCell>
            <TableCell align="right"><strong>GF</strong></TableCell>
            <TableCell align="right"><strong>GA</strong></TableCell>
            <TableCell align="right"><strong>GD</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.name}>
              <TableCell>{team.name}</TableCell>
              <TableCell align="right">{team.games_played}</TableCell>
              <TableCell align="right">{team.wins}</TableCell>
              <TableCell align="right">{team.losses}</TableCell>
              <TableCell align="right">{team.draws}</TableCell>
              <TableCell align="right">{(team.win_ratio * 100).toFixed(2)}</TableCell>
              <TableCell align="right">{team.goals_for}</TableCell>
              <TableCell align="right">{team.goals_against}</TableCell>
              <TableCell align="right">{team.goal_difference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
