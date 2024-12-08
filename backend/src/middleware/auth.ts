import { Request, Response, NextFunction } from "express";
import TokenService from "../middleware/token";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // gets token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];
  console.log('token in authmiddleware:', token);

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

export default authMiddleware;
