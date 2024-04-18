import { Router } from 'express';

import { getUsers } from '../controllers/UserController';

export const router = Router();

router.get('/', getUsers);
