import express from 'express';
import options from '../../config';
import { Router } from 'express';
import CreateSongPostController from '../src/Controllers/Songs/CreateSongPostController';
import GetSongsListGetController from '../src/Controllers/Songs/GetSongsListGetController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.post('/', new CreateSongPostController().execute);
router.get('/', new GetSongsListGetController().execute);

export default router;
