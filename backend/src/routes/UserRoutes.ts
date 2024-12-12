import UserController from "../controllers/UserController";
import { Router } from "express";
import { isModerator } from "../middleware/auth";

const userRoutes = Router();
const userController = new UserController();

// Defines the routes
userRoutes.get('/', isModerator, (req, res) => userController.getAllUsers(req, res));
//userRoutes.get('/:id', (req, res) => userController.getUserById(req, res));
userRoutes.post('/register', async (req, res) => {
  await userController.createUser(req, res);
});

userRoutes.post('/login', (req, res) => userController.loginUser(req,res));

export default userRoutes;