import express from 'express';
import options from '../../config';
import { Router } from 'express';
import GetBiblesListGetController from '../src/Controllers/Bibles/GetBiblesListGetController';
import GetBibleByIdGetController from '../src/Controllers/Bibles/GetBibleByIdGetController';
import GetBibleStructureGetController from '../src/Controllers/Bibles/GetBibleStructureGetController';

const router = Router();

router.use(options.corsOptions);

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/', new GetBiblesListGetController().execute);
router.get('/structure', new GetBibleStructureGetController().execute);
router.get('/:id', new GetBibleByIdGetController().execute);

export default router;
