import React from "react";
import styles from "../styles/Dashboard.module.css";

interface ExpandButtonProps {
  onClick: () => void;
}

export default function ExpandButton({ onClick }: ExpandButtonProps) {
  return (
    <div className={styles.expandContainer}>
      <button onClick={onClick} className={styles.expandButton}>
        <span className={styles.plusIcon}>+</span> Expand to see the rest of the teams stats
      </button>
    </div>
  );
}
