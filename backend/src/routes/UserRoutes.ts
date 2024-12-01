import UserController from "../controllers/UserController";
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();

// Defines the routes
userRoutes.get('/', (req, res) => userController.getAllUsers(req, res));
userRoutes.post('/register', (req, res) => userController.createUser(req, res));
userRoutes.post('/login', (req, res) => userController.loginUser(req,res));

export default userRoutes;
