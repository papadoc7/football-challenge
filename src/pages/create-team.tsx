import { useState } from "react";
import axios from "axios";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/CreateTeam.module.css";
import BackLink from "@/components/BackLink";

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
      setTimeout(() => {
        setInput("");
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
        <p>Put the team name and the player(s) in the textarea below.</p>
        <textarea
          rows={6}
          placeholder="Enter team name followed by player name(s) (one per line)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.textarea}
        />
        {/* second text area gia paixti */}
        <button onClick={handleCreateTeam} className={commonStyles.button}>
          Create Team
        </button>
        {message && (
          <p className={message.startsWith("Please") ? styles.errorMessage : styles.message}>
            {message}
          </p>
        )}
      </div>
    </BackLink>
  );
}
