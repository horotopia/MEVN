import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongooseService } from "../../services/mongoose";

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

const getUser = async (req: Request, res: Response) => {
  if (!SECRET_KEY) {
    res.status(500);
    throw new Error("JWT_SECRET is not defined");
  }

  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];

  if (!jwtToken) {
    res.status(401);
    throw new Error("No token, authorization denied");
  }

  const decoded = jwt.verify(jwtToken, SECRET_KEY) as jwt.JwtPayload;
  console.log(decoded);

  const mongooseService = await MongooseService.get();
  const user = await mongooseService.userService.findUserById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error("Authentication failed");
  }
  return user;
};

const validateRoleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser(req, res);
    if (user.role !== "ROLE_ADMIN") {
      res.status(403);
      throw new Error("You are not authorized to access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateRoleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser(req, res);
    if (user.role !== "ROLE_USER") {
      res.status(403);
      throw new Error("You are not authorized to access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateRoleAdminOrUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser(req, res);
    if (user.role !== "ROLE_ADMIN") {
      if (user.role !== "ROLE_USER") {
        res.status(403);
        throw new Error("You are not authorized to access this route");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id || req.body.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401);
      throw new Error("Invalid ID format");
    }
    const user = await getUser(req, res);
    if (user._id !== userId) {
      res.status(403);
      throw new Error("You are not authorized to access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateRoleAdminOrUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params)
    const userId = req.params.id || req.body.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401);
      throw new Error("Invalid ID format");
    }

    const user = await getUser(req, res);
    if (user.role !== "ROLE_ADMIN") {
      res.status(403);
      throw new Error("You are not authorized to access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateRoleAdmin,
  validateRoleAdminOrUser,
  validateRoleAdminOrUserId,
  validateRoleUser,
  validateUserId,
};
