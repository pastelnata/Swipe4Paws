import ShelterController from "../controllers/ShelterController";
import app from "../config/server";
import { Router } from "express";

const shelterRoutes = Router();
const shelterController = new ShelterController();

// Defines the routes
shelterRoutes.get('/', (req, res) => shelterController.getAllShelters(req, res)); 
shelterRoutes.get('/:id', (req, res) => shelterController.getShelterById(req, res));
shelterRoutes.post('/register', (req,res) => shelterController.createShelter(req,res));
//shelterRoutes.post('/login', (req,res) => shelterController.loginShelter(req,res));
//shelterRoutes.post('/logout', (req,res) => shelterController.logoutShelter(req,res));

export default shelterRoutes;