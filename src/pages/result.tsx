import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";
import { Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import styles from "../styles/Result.module.css";

export default function Result() {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamA, setTeamA] = useState<number | "">("");
  const [teamB, setTeamB] = useState<number | "">("");
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setMessage("Failed to load teams. Please try again.");
      }
    };

    fetchTeams();
  }, []);

  const fetchMatchResult = async () => {
    if (!teamA || !teamB || teamA === teamB) {
      setMessage("Please select two different teams.");
      setMatchResult(null);
      return;
    }

    try {
      const response = await axios.get(`/api/games/result`, {
        params: {
          team_1_id: teamA,
          team_2_id: teamB,
        },
      });
      setMatchResult(response.data);
      setMessage("");
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage("No match result found for the selected teams.");
      } else {
        setMessage("An error occurred while fetching the match result. Please try again.");
      }
      setMatchResult(null);
    }
  };

  return (
    <BackLink>
      <div className={styles.container}>
        <Typography variant="h4" gutterBottom>
          View Completed Match Results
        </Typography>
        <p className={styles.select}>Select two teams to view the match result.</p>

        <Box display="flex" flexDirection="column" gap={3}>
          <FormControl fullWidth>
            <InputLabel id="team-a-label">Select Team 1</InputLabel>
            <Select
              labelId="team-a-label"
              value={teamA}
              onChange={(e) => setTeamA(Number(e.target.value))}
              label="Select Team 1"
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="team-b-label">Select Team 2</InputLabel>
            <Select
              labelId="team-b-label"
              value={teamB}
              onChange={(e) => setTeamB(Number(e.target.value))}
              label="Select Team 2"
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={fetchMatchResult} fullWidth>
            View Match Result
          </Button>

          {message && (
            <Typography variant="body2" color={message.includes("No") ? "error" : "success"}>
              {message}
            </Typography>
          )}

          {matchResult && (
            <Box mt={3} p={2} border={1} borderColor="grey.500" borderRadius={2}>
              <Typography variant="h6" gutterBottom>
                Match Result:
              </Typography>
              <Typography variant="body1">Team 1: {matchResult.team_1_name}</Typography>
              <Typography variant="body1">Team 2: {matchResult.team_2_name}</Typography>
              <Typography variant="body1">
                Score: {matchResult.final_score_team_1} - {matchResult.final_score_team_2}
              </Typography>
              <Typography variant="body1">
                Date Played: {new Date(matchResult.date_played).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </BackLink>
  );
}
