import express, { Express } from "express";
import dotenv from "dotenv";
import IndexRoutes from "../routes/index.routes";
import FilesRoutes from "../routes/files.routes";

dotenv.config();

const app: Express = express();

app.use(IndexRoutes);
app.use(FilesRoutes);

app.listen(process.env.PORT || 3000, () =>
	console.log(`Server running on port ${process.env.PORT || 3000}`)
);
