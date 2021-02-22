import { Router } from 'express';

import * as noteController from '../controllers/notesController';
import isAyth from '../middleware/is-auth';

const router = Router();

router.get('/', isAyth, noteController.getNotes);

export default router;