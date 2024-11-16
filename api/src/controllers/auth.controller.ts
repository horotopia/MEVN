import { Request, Response } from 'express';
import { User } from '../models/user.model';
import logger from '../config/logger';
import { generateToken } from '../middlewares/jwt';

// /api/auth/register
const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.http(`${req.method} ${req.url} - ${res.statusCode}: User ${email} already exists`);
    res.status(400).json({ message: 'User already exists' });
  }

  try {
    const user = await User.create({ email, password });

    // Create token
    const jwtToken = generateToken({ id: user._id });

		// Stockage du JWT dans un cookie HttpOnly
		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
    res.status(201).json({ jwtToken });
  } catch (err: Error | any) {
    logger.error(`Error registering user ${email}: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

// /api/auth/login
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(user.matchPasswords(password))) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Invalid credentials`);
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Create token
    const jwtToken = generateToken({ id: user._id });

		// Stockage du JWT dans un cookie HttpOnly
		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: 'Connexion réussie', jwtToken });
  } catch (err: Error | any) {
    logger.error(`Error logging in user ${email}: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

export {
  loginUser,
  registerUser
};
