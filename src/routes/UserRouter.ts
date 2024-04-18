import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';

import { getUsers, loginUser } from '../controllers/UserController';

export const userRouter = Router();

userRouter.get('/', authenticateToken, getUsers);
