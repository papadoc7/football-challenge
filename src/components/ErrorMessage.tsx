import React from "react";
import styles from "../styles/Dashboard.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles.errorMessage}>{message}</p>;
}
