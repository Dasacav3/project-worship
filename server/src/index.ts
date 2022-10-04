import express, { Express } from "express";
import IndexRoutes from "../routes/IndexRoutes";
import FilesRoutes from "../routes/FilesRoutes";
import options from "../../config";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();

const app: Express = express();

app.use('/', IndexRoutes);
app.use('/files', FilesRoutes);
app.use(options.corsOptions);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(process.env.PORT || 3000, () =>
	console.log(`Server running on port ${process.env.PORT || 3000}`)
);
