import PetController from "../controllers/PetController";
import { Router } from "express";
import authMiddleware from "../middleware/auth";

const petRoutes = Router();
const petController = new PetController();

// Defines the routes
petRoutes.get('/', petController.getAllPets);
petRoutes.post('/', authMiddleware, petController.addPet);
petRoutes.put('/:id', authMiddleware, petController.updatePet);
petRoutes.delete('/:id', authMiddleware, petController.deletePet);
petRoutes.get('/search', petController.searchPets);

export default petRoutes;