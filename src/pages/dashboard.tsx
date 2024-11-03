import { useEffect, useState } from "react";
import axios from "axios";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/Dashboard.module.css";

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

export default function Dashboard() {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setTeamStats(response.data);
      } catch (err) {
        console.error("Error fetching team statistics:", err);
        setError("Failed to load team statistics. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, []);

  if (loading) {
    return <p>Loading team statistics...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  const visibleTeams = expanded ? teamStats : teamStats.slice(0, 10);

  return (
    <div className={`${styles.container} ${commonStyles.paddingMedium}`}>
      <h1>Dashboard</h1>
      <p>View team and individual player statistics.</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Team/Player Name</th>
            <th className={styles.tableHeader}>Games Played</th>
            <th className={styles.tableHeader}>Wins</th>
            <th className={styles.tableHeader}>Losses</th>
            <th className={styles.tableHeader}>Draws</th>
            <th className={styles.tableHeader}>Win Ratio</th>
            <th className={styles.tableHeader}>GF</th>
            <th className={styles.tableHeader}>GA</th>
            <th className={styles.tableHeader}>GD</th>
          </tr>
        </thead>
        <tbody>
          {visibleTeams.map((team) => (
            <tr key={team.name} className={styles.tableRow}>
              <td className={styles.tableCell}>{team.name}</td>
              <td className={styles.tableCell}>{team.games_played}</td>
              <td className={styles.tableCell}>{team.wins}</td>
              <td className={styles.tableCell}>{team.losses}</td>
              <td className={styles.tableCell}>{team.draws}</td>
              <td className={styles.tableCell}>{(team.win_ratio * 100).toFixed(2)}%</td>
              <td className={styles.tableCell}>{team.goals_for}</td>
              <td className={styles.tableCell}>{team.goals_against}</td>
              <td className={styles.tableCell}>{team.goal_difference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!expanded && teamStats.length > 10 && (
        <div className={styles.expandContainer}>
          <button onClick={() => setExpanded(true)} className={styles.expandButton}>
            <span className={styles.plusIcon}>+</span> Expand to see the rest of the teams stats
          </button>
        </div>
      )}
    </div>
  );
}
