import { Router } from 'express';
import { body } from 'express-validator';

import * as notesController from '../controllers/notesController';
import isAuth from '../middleware/is-auth';

const router = Router();

//GET -> all notes
router.get('/', isAuth, notesController.getNotes);

//POST -> create note
router.post('/', isAuth,
    [body('description').isString().default('no description').trim(),
     body('id').notEmpty()
    ], notesController.createNote);
    
//DELETE -> delete one note
router.delete('/:id?', isAuth, notesController.deleteNote);


export default router;