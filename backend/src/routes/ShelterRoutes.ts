import ShelterController from "../controllers/ShelterController";
import app from "../config/server";
import { Router } from "express";
import { isModerator } from "../middleware/auth";

const shelterRoutes = Router();
const shelterController = new ShelterController();

// Defines the routes
shelterRoutes.get('/', (req, res) => shelterController.getAllShelters(req, res)); 
shelterRoutes.get('/:id', (req, res) => shelterController.getShelterById(req, res));
shelterRoutes.post('/register', async (req,res) => await shelterController.createShelter(req,res));
//shelterRoutes.post('/login', (req,res) => shelterController.loginShelter(req,res));
//shelterRoutes.post('/logout', (req,res) => shelterController.logoutShelter(req,res));

shelterRoutes.patch('/:id/', async (req, res) => {
    try {
        await shelterController.updateShelterStatus(req, res);
    } 
    catch(error) {
        console.log(error);
    }
});

export default shelterRoutes;