import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../helpers/token';
import { Token } from '../models/Token';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const registerUser = async (req: Request, res: Response) => {
  // Validation and create user...
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });


  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await Token.create({ userId: user.id, accessToken, refreshToken });
  res.json({ accessToken, refreshToken });
};


export const loginUser = async (req: Request, res: Response, next:NextFunction) => {
  try{
    // Login validation...
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await Token.create({ userId: user.id, accessToken, refreshToken });
    res.json({ accessToken, refreshToken });
    
  }catch(error:any){
    next(error);
  }

};

export const refreshToken = async (req: Request, res: Response, next:NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const token = await Token.findOne({ where: { refreshToken, isActive: true } });
    if (!token) return res.sendStatus(403);
    const user = await User.findByPk(token.userId);
    if (!user) return res.sendStatus(403);
    
    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Create new token with new tokens
    const newToken = await Token.create({ userId: user.id, accessToken: newAccessToken, refreshToken: newRefreshToken });


    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error)
  }
};


export const revokeToken = async (req: Request, res: Response, next:NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(400);

  try {
    const token = await Token.findOne({ where: { refreshToken, isActive: true } });
    if (!token) return res.sendStatus(404);
    await token.update({ isActive: false });
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
};