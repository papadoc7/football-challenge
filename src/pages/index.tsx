import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Football League App!</h1>
      <p>Track scores, create teams, and view player statistics with ease.</p>

      <div style={styles.menu}>
        <h2>Menu</h2>
        <ul style={styles.menuList}>
          <li>
            <Link href="/new-game" style={styles.link}>
              Start a New Game
            </Link>
          </li>
          <li>
            <Link href="/result" style={styles.link}>
              Enter Completed Game Result
            </Link>
          </li>
          <li>
            <Link href="/create-team" style={styles.link}>
              Create Teams
            </Link>
          </li>
          <li>
            <Link href="/dashboard" style={styles.link}>
              View Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    textAlign: "center" as "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  menu: {
    marginTop: "24px",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
    fontSize: "16px",
  },
};
