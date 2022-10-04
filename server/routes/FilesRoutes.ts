import express from "express";
import options from "../../config";
import { Router } from "express";
import CreateFilePostController from "../src/Controllers/CreateFilePostController";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import path from "path";
import { generateUuid } from "../src/Infrastructure/Utils/Utils";

const router = Router();

router.use(options.corsOptions);

router.use(bodyParser.urlencoded({ extended: true }));

const fileUploader = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = path.join(options.__dirname, "/server/uploads");
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, generateUuid() + path.extname(file.originalname));
		},
	}),
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "video/mp4" ||
			file.mimetype === "video/avi" ||
			file.mimetype === "video/mov" ||
			file.mimetype === "video/wmv" ||
			file.mimetype === "video/flv" ||
			file.mimetype === "video/mkv"
		) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
}).single("file");

router.post("/", fileUploader, new CreateFilePostController().execute);

router.use("/uploads", express.static(path.resolve("uploads")));

export default router;
