import { useState } from "react";
import axios from "axios";

export default function CreateTeam() {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateTeam = async () => {
    // Parse the input
    const lines = input.trim().split("\n");
    const teamNameLine = lines[0] || ""; // First line is the team name
    const players = lines.slice(1); // Subsequent lines are player names
    // Validate team name and player(s) count
    const criteriaNotMet =
      !teamNameLine.startsWith("Team ") || players.length < 1 || players.length > 2;

    if (criteriaNotMet) {
      setMessage("Please ensure the first line starts with 'Team ' and enter 1 or 2 player names.");
      return;
    }

    const teamName = teamNameLine.replace("Team ", "").trim();

    try {
      const response = await axios.post("/api/teams/create", {
        name: teamName,
      });
      // console.log("Team created:", response.data);
      setMessage(`Team created! Team ID: ${response.data.teamId}`);
    } catch (error) {
      console.error("Error creating team:", error);
      setMessage("Failed to create team. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create Teams</h1>
      <p>Put the team name and the player(s) in the textarea below.</p>
      <textarea
        rows={6}
        placeholder="Enter team name followed by player name(s) (one per line)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={handleCreateTeam} style={styles.button}>
        Create Team
      </button>
      {message && (
        <p style={message.startsWith("Please") ? styles.errorMessage : styles.message}>{message}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    textAlign: "center" as "center",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "16px",
    fontSize: "16px",
    marginBottom: "16px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "green",
  },
  errorMessage: {
    marginTop: "20px",
    fontSize: "16px",
    color: "red",
  },
};
