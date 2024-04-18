// routes/AuthRoutes.ts

import { Router } from 'express';
import { loginUser, registerUser, refreshToken, revokeToken } from '../controllers/UserController';

export const authRouter = Router();

authRouter.post('/token', loginUser);
authRouter.post('/token/refresh', refreshToken);
authRouter.post('/token/revoke', revokeToken);

authRouter.post('/register', registerUser);
