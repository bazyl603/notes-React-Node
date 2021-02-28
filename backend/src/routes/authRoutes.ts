import { Router } from 'express';

import { login, changePassword } from '../controllers/authController';
import isAuth from '../middleware/is-auth';

const router = Router();

router.post('/login', login);
router.post('/change-password', isAuth, changePassword);

export default router;