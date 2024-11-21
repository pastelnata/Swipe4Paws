import UserController from "../controllers/UserController";
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();

// Defines the routes
userRoutes.get('/', userController.getAllUsers); 

export default userRoutes;