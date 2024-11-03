import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import styles from "../styles/NewGame.module.css";

/**
 * Get the current date in "dd-MM-yyyy" format.
 */
const getTodayDate = () => format(new Date(), "dd-MM-yyyy");

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
      // console.log("Game started:", response.data);
      alert(`Game has been started! Game ID: ${response.data.gameId}`);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>New Game</h2>
      <p>Game Date: {gameDate}</p>

      <div className={styles.inputContainer}>
        <label>
          <span>Example: 1 (for Team 1)</span>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(Number(e.target.value))}
            placeholder="Enter ID of first team"
            className={styles.input}
          />
        </label>

        <label>
          <span>Example: 2 (for Team 2)</span>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(Number(e.target.value))}
            placeholder="Enter ID of second team"
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.teamsContainer}>
        <div className={styles.team}>
          <h3>{teamA}</h3>
          <p>Score: 0</p>
        </div>
        <div className={styles.team}>
          <h3>{teamB}</h3>
          <p>Score: 0</p>
        </div>
      </div>

      <button onClick={handleStartGame} className={styles.button}>
        Start Game
      </button>
    </div>
  );
}
