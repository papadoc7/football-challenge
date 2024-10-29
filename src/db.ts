import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function openDb(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: "../table-football-challenge.db",
    driver: sqlite3.Database,
  });
}
