// helpers/token.ts

import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Token } from '../models/Token';

export const generateAccessToken = (user: User): string => {
  console.log('secret '+ process.env.ACCESS_TOKEN_SECRET)
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: User): string => {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!);
};

export const verifyToken = (token: string, secret: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded: any = jwt.verify(token, secret);
      const tokenRecord = await Token.findOne({ where: { accessToken: token } });
      if (!tokenRecord || !tokenRecord.isActive) {
        return reject(new Error('Token is revoked or invalid'));
      }
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};