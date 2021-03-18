import {
    Router
} from 'express';
import {
    body
} from 'express-validator';

import * as notesController from '../controllers/notesController';
import isAuth from '../middleware/is-auth';

const router = Router();

//GET -> all notes /?userId=...
router.get('/', isAuth, notesController.getNotes);

//POST -> create note
router.post('/', isAuth,
    [body('description').isString(),
        body('userId').notEmpty().isString().trim()
    ], notesController.createNote);

//DELETE -> delete one note /?noteId=&userId...
router.delete('/', isAuth, notesController.deleteNote);

//PUT  -> edit one note /?noteId
router.put('/', isAuth, [body('description').notEmpty().isString().trim(), body('userId').notEmpty().isString().trim()], notesController.editNote);

export default router;