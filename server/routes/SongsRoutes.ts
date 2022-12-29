import express from 'express';
import options from '../config';
import { Router } from 'express';
import CreateSongPostController from '../src/Controllers/Songs/CreateSongPostController';
import GetSongsListGetController from '../src/Controllers/Songs/GetSongsListGetController';
import GetSongByIdGetController from '../src/Controllers/Songs/GetSongByIdGetController';
import UpdateSongPutController from '../src/Controllers/Songs/UpdateSongPutController';
import RemoveSongDeleteController from '../src/Controllers/Songs/RemoveSongDeleteController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.post('/', new CreateSongPostController().execute);
router.get('/', new GetSongsListGetController().execute);
router.get('/:id', new GetSongByIdGetController().execute);
router.put('/:id', new UpdateSongPutController().execute);
router.delete('/:id', new RemoveSongDeleteController().execute);

export default router;
