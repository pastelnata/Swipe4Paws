import { Router } from "express";
import ModeratorController from "../controllers/ModeratorController";
import { isModerator } from "../middleware/auth";

const modRoutes = Router();
const modController = new ModeratorController();

// Defines the routes
modRoutes.get('/', isModerator, (req, res) => modController.getAllMods(req, res)); 
//modRoutes.get('/:id', (req, res) => modController.getModeratorById(req, res));
//modRoutes.post('/register', (req, res) => modController.createMod(req, res));
//modRoutes.post('/login', (req, res) => modController.loginMod(req,res));
//modRoutes.post('/logout', (req, res) => modController.logoutMod(req,res));

export default modRoutes;