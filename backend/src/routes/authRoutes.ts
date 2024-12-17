import TokenService from "../middleware/token";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
const authRoutes = Router();

authRoutes.post('/token', authMiddleware, (req, res) => {
    const token = res.locals.user;
    res.json({ token });
});

export default authRoutes;