import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

/**
 * Get the current date in "dd-MM-yyyy" format.
 */
const getTodayDate = () => {
  return format(new Date(), "dd-MM-yyyy");
};

export default function NewGame() {
  const [gameDate, setGameDate] = useState<string>("");
  const [teamA, setTeamA] = useState<number>(1);
  const [teamB, setTeamB] = useState<number>(2);

  useEffect(() => {
    setGameDate(getTodayDate());
  }, []);

  const handleStartGame = async () => {
    try {
      const response = await axios.post("/api/games/start", {
        team_1_id: teamA,
        team_2_id: teamB,
        date_played: gameDate,
      });
      console.log("Game started:", response.data);
      alert(`Game has been started! Game ID: ${response.data.gameId}`);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>New Game</h2>
      <p>Game Date: {gameDate}</p>

      <div style={styles.inputContainer}>
        <label>
          <span>Example: 1 (for Team 1) </span>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(Number(e.target.value))}
            placeholder="Enter ID of first team"
            style={styles.input}
          />
        </label>

        <label>
          <span>Example: 2 (for Team 2) </span>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(Number(e.target.value))}
            placeholder="Enter ID of second team"
            style={styles.input}
          />
        </label>
      </div>

      <div style={styles.teamsContainer}>
        <div style={styles.team}>
          <h3>{teamA}</h3>
          <p>Score: 0</p>
        </div>
        <div style={styles.team}>
          <h3>{teamB}</h3>
          <p>Score: 0</p>
        </div>
      </div>

      <button onClick={handleStartGame} style={styles.button}>
        Start Game
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    textAlign: "center" as "center",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "200px",
    marginTop: "5px",
  },
  teamsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: "600px",
    marginTop: "20px",
  },
  team: {
    width: "45%",
    padding: "10px",
    backgroundColor: "#f3f3f3",
    borderRadius: "8px",
    textAlign: "center" as "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
