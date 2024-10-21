import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'JWT_SECRET is not defined' });
    return;
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({ message: 'Token is not valid' });
      return;
    }

    const { id, email, role } = await User.findById(decoded.id).select('id email role');
    req.user = { id, email, role };

    if (role !== 'ROLE_ADMIN') {
      res.status(403).json({ message: 'You are not authorized to access this route' });
    }

    next();
  });
}

module.exports = auth;
