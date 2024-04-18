// middleware/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token';

// Extend the Request type to include a 'userId' property
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded: any = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
