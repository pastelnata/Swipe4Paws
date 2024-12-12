import { Request, Response, NextFunction } from "express";
import TokenService from "../middleware/token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // gets token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // if no token is provided, return a 401 status code
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // verifies the token
    const decoded = TokenService.verifyToken(token);
    if (typeof decoded === "object" && decoded !== null) {
      // if the token is valid, set the user in the locals object
      res.locals.user = decoded;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token." });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export const isModerator = (req: Request, res: Response, next: NextFunction) => {
  // checks if the user is a moderator
  authMiddleware(req, res, () => {
    if (res.locals.user.role === 'moderator') {
      next();
    } else {
      return res.status(403).json({ message: "You can't do this." });
    }
  })
}

export const isShelter = (req: Request, res: Response, next: NextFunction) => {
  // checks if the user is a shelter
  authMiddleware(req, res, () => {
    if (res.locals.user.role === 'shelter') {
      next();
    } else {
      return res.status(403).json({ message: "You can't do this." });
    }
  })
}

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  // checks if the user is a user
  authMiddleware(req, res, () => {
    if (res.locals.user.role === 'user') {
      next();
    } else {
      return res.status(403).json({ message: "You can't do this." });
    }
  })
}