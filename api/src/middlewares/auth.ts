import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const auth = async (req: any, res: any, next: any) => {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    console.log(await User.findById(decoded.id));
    console.log(req.user);

    // const { id, email, role } = await User.findById(decoded.id);
    // req.user = { id, email, role };

    // if (role !== 'ROLE_ADMIN') {
    //   return res.status(403).json({ message: 'You are not authorized to access this route' });
    // }

    next();
  });
}

module.exports = auth;
