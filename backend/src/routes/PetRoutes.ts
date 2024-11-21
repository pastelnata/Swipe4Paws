import PetController from "../controllers/PetController";
import Router from "express";

const petRoutes = Router();
const petController = new PetController();

// Defines the routes
petRoutes.get('/', petController.getAllPets);
petRoutes.post('/', petController.addPet);
petRoutes.put('/:id', petController.updatePet);
petRoutes.delete('/:id', petController.deletePet);
petRoutes.get('/search', petController.searchPets);

export default petRoutes;