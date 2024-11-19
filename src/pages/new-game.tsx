import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import BackLink from "@/components/BackLink";
import styles from "../styles/NewGame.module.css";

const getTodayDate = () => format(new Date(), "yyyy-MM-dd"); // Update date format to match API expectation

interface Team {
  id: number;
  name: string;
}

export default function NewGame() {
  const [gameDate, setGameDate] = useState<string>("");
  const [teamA, setTeamA] = useState<number | null>(null);
  const [teamB, setTeamB] = useState<number | null>(null);
  const [scoreTeamA, setScoreTeamA] = useState<number>(0);
  const [scoreTeamB, setScoreTeamB] = useState<number>(0);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setGameDate(getTodayDate());

    // Fetch all teams
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        alert("Failed to fetch teams. Please try again later.");
      }
    };

    fetchTeams();
  }, []);

  const handleStartGame = async () => {
    if (!teamA || !teamB) {
      alert("Please select both teams.");
      return;
    }

    try {
      const response = await axios.post("/api/games/start", {
        team_1_id: teamA,
        team_2_id: teamB,
        date_played: gameDate,
        final_score_team_1: scoreTeamA,
        final_score_team_2: scoreTeamB,
        is_active: 0, // match has ended
      });
      alert(`Game has been started! Game ID: ${response.data.gameId}`);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game. Please try again.");
    }
  };

  return (
    <BackLink>
      <div className={styles.container}>
        <h2>New Game</h2>
        <p>Game Date: {gameDate}</p>

        <div className={styles.inputContainer}>
          <label>
            Team 1:{" "}
            <select
              value={teamA ?? ""}
              onChange={(e) => setTeamA(Number(e.target.value))}
              className={styles.input}
            >
              <option value="" disabled>
                Select Team 1
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Team 2:{" "}
            <select
              value={teamB ?? ""}
              onChange={(e) => setTeamB(Number(e.target.value))}
              className={styles.input}
            >
              <option value="" disabled>
                Select Team 2
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.teamsContainer}>
          <div className={styles.team}>
            <h3>{teamA ? teams.find((t) => t.id === teamA)?.name : "Team 1"}</h3>
            <label>
              Score:
              <input
                type="number"
                min="0"
                max="100"
                value={scoreTeamA === 0 ? "" : scoreTeamA}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setScoreTeamA(value >= 0 ? value : 0);
                }}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.team}>
            <h3>{teamB ? teams.find((t) => t.id === teamB)?.name : "Team 2"}</h3>
            <label>
              Score:
              <input
                type="number"
                min="0"
                max="100"
                value={scoreTeamB === 0 ? "" : scoreTeamB}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setScoreTeamB(value >= 0 ? value : 0);
                }}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        <button onClick={handleStartGame} className={styles.button}>
          Start Game
        </button>
      </div>
    </BackLink>
  );
}
