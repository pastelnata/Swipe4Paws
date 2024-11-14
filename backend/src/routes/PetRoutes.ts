import PetController from "../controllers/PetController";
import Router from "express";

const petRoutes = Router();
const petController = new PetController();

// Defines the routes
petRoutes.get('/pets', petController.getAllPets);
petRoutes.post('/pets', petController.addPet);
petRoutes.put('/pets/:id', petController.updatePet);
petRoutes.delete('/pets/:id', petController.deletePet);
petRoutes.get('/pets/search', petController.searchPets);

export default petRoutes;