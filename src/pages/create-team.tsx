import { useState } from "react";
import axios from "axios";

export default function CreateTeam() {
  const [input, setInput] = useState<string>(""); // State for the textarea input
  const [message, setMessage] = useState<string>(""); // State for displaying messages

  const handleCreateTeam = async () => {
    // Parse the input
    const lines = input.trim().split("\n");
    const teamName = lines[0] || ""; // First line is the team name
    const players = lines.slice(1); // Subsequent lines are player names
    const criteriaNotMet = !teamName || players.length < 1 || players.length > 2;

    if (criteriaNotMet) {
      setMessage("Please enter a team name and 1 or 2 player names.");
      return;
    }

    try {
      const response = await axios.post("/api/teams/create", {
        name: teamName,
      });
      console.log("Team created:", response.data);
      setMessage(`Team created! Team ID: ${response.data.teamId}`);
    } catch (error) {
      console.error("Error creating team:", error);
      setMessage("Failed to create team. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create Teams</h1>
      <p>Feature to create teams with one or two players will go here.</p>
      <textarea
        rows={6}
        placeholder="Enter team name followed by player names (one per line)"
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
    maxWidth: "600px",
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
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
