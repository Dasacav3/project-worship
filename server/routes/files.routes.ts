import { Router, Request, Response } from "express";

const router = Router();

router.get("/files/:id/streaming", (req: Request, res: Response) => {
	const id = req.params.id;
	res.send(`Streaming file with id ${id}`);
});

export default router;
