import fs from 'fs';
import express from 'express';
import options from '../config';
import multer from 'multer';
import { Router } from 'express';
import CreateSongPostController from '../src/Controllers/Songs/CreateSongPostController';
import GetSongsListGetController from '../src/Controllers/Songs/GetSongsListGetController';
import GetSongByIdGetController from '../src/Controllers/Songs/GetSongByIdGetController';
import UpdateSongPutController from '../src/Controllers/Songs/UpdateSongPutController';
import RemoveSongDeleteController from '../src/Controllers/Songs/RemoveSongDeleteController';
import ImportSongsPostController from '../src/Controllers/Songs/ImportSongsPostController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

// Receive files from client withot saving them anywhere
router.use(
    multer({
        storage: multer.memoryStorage(),
    }).single('file')
);

router.post('/', new CreateSongPostController().execute);
router.post('/import', new ImportSongsPostController().execute);
router.get('/', new GetSongsListGetController().execute);
router.get('/:id', new GetSongByIdGetController().execute);
router.put('/:id', new UpdateSongPutController().execute);
router.delete('/:id', new RemoveSongDeleteController().execute);

export default router;
