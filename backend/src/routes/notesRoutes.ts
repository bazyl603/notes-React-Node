import { Router } from 'express';

import * as noteController from '../controllers/notesController';

const router = Router();

router.get('/', noteController.getNotes);

export default router;