import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

const auth = async (req, res, next) => {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    const { id, email, role } = await UserModel.findById(decoded.id);
    req.user = { id, email, role };

    if (role !== 'ROLE_ADMIN') {
      return res.status(403).json({ message: 'You are not authorized to access this route' });
    }

    next();
  });
}

module.exports = auth;
