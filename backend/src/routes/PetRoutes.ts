import PetController from "../controllers/PetController";
import Router from "express";

const petRoutes = Router();
const petController = new PetController();

// Defines the routes
petRoutes.get('/pets', petController.getAllPets);
petRoutes.get('/pets/search', petController.searchPets);

export default petRoutes;