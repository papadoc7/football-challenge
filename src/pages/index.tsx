import Link from "next/link";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={`${styles.container} ${commonStyles.textCenter}`}>
      <h1>Welcome to the Football League App!</h1>
      <p>Track scores, create teams/players, and view teams/players statistics with ease.</p>

      <div className={styles.menu}>
        <h2>Menu</h2>
        <ul className={styles.menuList}>
          <li>
            <Link href="/new-game" className={styles.link}>
              Start a New Game
            </Link>
          </li>
          <li>
            <Link href="/result" className={styles.link}>
              Enter Completed Game Result
            </Link>
          </li>
          <li>
            <Link href="/create-team" className={styles.link}>
              Create Teams
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className={styles.link}>
              View Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
