import fs from 'fs';
import path from 'path';
import express from 'express';
import options from '../config';
import multer from 'multer';
import { Router } from 'express';
import CreateFilePostController from '../src/Controllers/Files/CreateFilePostController';
import { generateUuid } from '../src/Infrastructure/Utils/Utils';
import GetFilesListGetController from '../src/Controllers/Files/GetFilesListGetController';
import GetFileByIdGetController from '../src/Controllers/Files/GetFileByIdGetController';
import UpdateFilePutController from '../src/Controllers/Files/UpdateFilePutController';
import RemoveFileDeleteController from '../src/Controllers/Files/RemoveFileDeleteController';
import GetFileContentGetController from '../src/Controllers/Files/GetFileContentGetController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.use('/uploads', express.static(path.resolve('uploads')));

const fileUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(options.__dirname, '/uploads');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, generateUuid() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/avi' ||
      file.mimetype === 'video/mov' ||
      file.mimetype === 'video/wmv' ||
      file.mimetype === 'video/flv' ||
      file.mimetype === 'video/mkv'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}).single('file');

router.post('/', fileUploader, new CreateFilePostController().execute);
router.get('/', new GetFilesListGetController().execute);
router.get('/:id', new GetFileByIdGetController().execute);
router.put('/:id', new UpdateFilePutController().execute);
router.delete('/:id', new RemoveFileDeleteController().execute);
router.get('/:id/streaming', new GetFileContentGetController().execute);

export default router;
