import { useState } from "react";
import axios from "axios";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/CreateTeam.module.css";
import BackLink from "@/components/BackLink";
import { TextField, Button } from "@mui/material";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState<string>("");
  const [players, setPlayers] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateTeam = async () => {
    // Validate team name and player(s) count
    const playerNames = players
      .trim()
      .split("\n")
      .map((player) => player.trim())
      .filter((player) => player);
    const criteriaNotMet =
      !teamName.startsWith("Team ") || playerNames.length < 1 || playerNames.length > 2;

    if (criteriaNotMet) {
      setMessage("Please ensure the team name starts with 'Team ' and enter 1 or 2 player names.");
      return;
    }

    try {
      const response = await axios.post("/api/teams/create", {
        name: teamName.replace("Team ", "").trim(),
      });

      setMessage(`Team created! Team ID: ${response.data.teamId}`);
      setTimeout(() => {
        setTeamName("");
        setPlayers("");
      }, 500);
    } catch (error) {
      console.error("Error creating team:", error);
      setMessage("Failed to create team. Please try again.");
    }
  };

  return (
    <BackLink>
      <div className={styles.container}>
        <h1>Create Teams</h1>
        <p>Enter the team name followed by player(s) in the fields below.</p>

        <TextField
          label="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          fullWidth
          className={styles.textField}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Players (one per line)"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          fullWidth
          multiline
          rows={4}
          className={styles.textField}
          variant="outlined"
          margin="normal"
        />

        <Button
          onClick={handleCreateTeam}
          variant="contained"
          color="primary"
          className={commonStyles.button}
        >
          Create Team
        </Button>

        {message && (
          <p className={message.startsWith("Please") ? styles.errorMessage : styles.message}>
            {message}
          </p>
        )}
      </div>
    </BackLink>
  );
}
