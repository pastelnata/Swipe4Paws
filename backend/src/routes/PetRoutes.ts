import PetController from "../controllers/PetController";
import { Router } from "express";
import { isShelter } from "../middleware/auth";

const petRoutes = Router();
const petController = new PetController();
//const router = express.Router();

// Defines the routes
petRoutes.get('/', petController.getAllPets);
petRoutes.post('/', isShelter, petController.addPet);
petRoutes.post('/add', (req, res) => petController.addPet(req, res));
petRoutes.put('/:id', isShelter, petController.updatePet);
petRoutes.delete('/:id', isShelter, petController.deletePet);
petRoutes.get('/search', petController.searchPets);
/*
petRoutes.post('/', petController.addPet);
petRoutes.post('/add', (req, res) => petController.addPet(req, res));
petRoutes.put('/:id', petController.updatePet);
petRoutes.delete('/:id', petController.deletePet); */


export default petRoutes;