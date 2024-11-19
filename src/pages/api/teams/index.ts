import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "@/db";

export default async function getTeams(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDb();

  if (req.method === "GET") {
    try {
      const teams = await db.all("SELECT id, name FROM teams");
      res.status(200).json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
