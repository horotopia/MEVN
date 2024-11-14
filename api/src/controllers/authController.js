import { User } from '../models/user.model.js';
import logger from '../config/logger.js';
import { generateToken } from '../middlewares/jwt.js';

// /api/auth/register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.http(`${req.method} ${req.url} - ${res.statusCode}: User ${email} already exists`);
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const user = await User.create({ email, password });

    // Create token
    const jwtToken = generateToken({ id: user._id });

		// Stockage du JWT dans un cookie HttpOnly
		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
    res.status(201).json({ jwtToken });
  } catch (error) {
    logger.error(`Error registering user ${email}: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

// /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPasswords(password))) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const jwtToken = generateToken({ id: user._id });

		// Stockage du JWT dans un cookie HttpOnly
		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: false ,sameSite: 'Lax', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: 'Connexion réussie', jwtToken });
  } catch (error) {
    logger.error(`Error logging in user ${email}: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

// /api/auth/logout
const logoutUser = async (req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Utiliser 'secure' en production
    sameSite: 'Strict'
  });
  return res.status(200).json({ message: "User logged out successfully" });
};

export {
  loginUser,
  registerUser,
  logoutUser
};
