import { Router } from 'express';
import { body } from 'express-validator';

import * as noteController from '../controllers/notesController';
import isAuth from '../middleware/is-auth';

const router = Router(); // TODO dodać walidację danych przychodzących

//GET
router.get('/', isAuth, noteController.getNotes);
//POST
router.post('/', isAuth,
    [body('description').isString().default('no description').trim(),
     body('id').notEmpty()
    ], noteController.createNote);

export default router;