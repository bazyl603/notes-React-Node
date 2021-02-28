import {
    Router
} from 'express';
import {
    body
} from 'express-validator';

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

//DELETE -> delete one note /?noteId=...
router.delete('/', isAuth, [body('userId').notEmpty().isString().trim()], notesController.deleteNote);

//PUT  -> edit one note /?noteId
router.put('/', isAuth, [body('description').notEmpty().isString().trim(), body('userId').notEmpty().isString().trim()], notesController.editNote);

export default router;