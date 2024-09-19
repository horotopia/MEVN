const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const { generateToken } = require('../middlewares/jwt');

// /api/auth/register
const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    logger.http(`${req.method} ${req.url} - ${res.statusCode}: User ${email} already exists`);
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const user = await Users.create({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (error) {
    logger.error(`Error registering user ${email}: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

// /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and password is correct
    const user = await Users.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare passwords
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create token
    const token = generateToken({ id: user._id });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    logger.error(`Error logging in user ${email}: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};