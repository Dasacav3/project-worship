import express from 'express';
import options from '../../config';
import { Router } from 'express';
import GetBiblesListGetController from '../src/Controllers/Bibles/GetBiblesListGetController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/', new GetBiblesListGetController().execute);

export default router;
