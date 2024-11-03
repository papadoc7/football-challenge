import { useEffect, useState } from "react";
import axios from "axios";

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
    return <p style={styles.errorMessage}>{error}</p>;
  }

  const visibleTeams = expanded ? teamStats : teamStats.slice(0, 10);

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <p>View team and individual player statistics.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Team/Player Name</th>
            <th style={styles.tableHeader}>Games Played</th>
            <th style={styles.tableHeader}>Wins</th>
            <th style={styles.tableHeader}>Losses</th>
            <th style={styles.tableHeader}>Draws</th>
            <th style={styles.tableHeader}>Win Ratio</th>
            <th style={styles.tableHeader}>GF</th>
            <th style={styles.tableHeader}>GA</th>
            <th style={styles.tableHeader}>GD</th>
          </tr>
        </thead>
        <tbody>
          {visibleTeams.map((team) => (
            <tr key={team.name} style={styles.tableRow}>
              <td style={styles.tableCell}>{team.name}</td>
              <td style={styles.tableCell}>{team.games_played}</td>
              <td style={styles.tableCell}>{team.wins}</td>
              <td style={styles.tableCell}>{team.losses}</td>
              <td style={styles.tableCell}>{team.draws}</td>
              <td style={styles.tableCell}>{(team.win_ratio * 100).toFixed(2)}%</td>
              <td style={styles.tableCell}>{team.goals_for}</td>
              <td style={styles.tableCell}>{team.goals_against}</td>
              <td style={styles.tableCell}>{team.goal_difference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!expanded && teamStats.length > 10 && (
        <div style={styles.expandContainer}>
          <button onClick={() => setExpanded(true)} style={styles.expandButton}>
            <span style={styles.plusIcon}>+</span> Expand to see the rest of the teams stats
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    textAlign: "center" as "center",
  },
  table: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    borderCollapse: "collapse" as "collapse",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f4",
  },
  tableRow: {
    border: "1px solid #ddd",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  errorMessage: {
    color: "red",
    marginTop: "20px",
  },
  expandContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  expandButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "#0070f3",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: "20px",
    marginRight: "8px",
  },
};
