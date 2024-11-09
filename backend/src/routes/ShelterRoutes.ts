import ShelterController from "../controllers/ShelterController";
import app from "../config/server";
import { Router } from "express";

const shelterRoutes = Router();
const shelterController = new ShelterController();

// Defines the routes
shelterRoutes.get('/shelters', shelterController.getAllShelters); 

export default shelterRoutes;