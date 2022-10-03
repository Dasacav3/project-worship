import { Router, Request, Response } from "express";
import { openDb } from "../src/db";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the API of the project");
});

router.get("/ping", async (req: Request, res: Response) => {
	const [rows] = await openDb().then((db) => db.all("SELECT 1 + 1 AS result"));
	res.json(rows);
});

export default router;
