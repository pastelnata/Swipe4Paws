import { Router } from "express";
import ModeratorController from "../controllers/ModeratorController";

const modRoutes = Router();
const modController = new ModeratorController();

// Defines the routes
modRoutes.get('/', modController.getAllMods); 

export default modRoutes;