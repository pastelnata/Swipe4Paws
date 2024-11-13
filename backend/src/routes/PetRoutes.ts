import PetController from "../controllers/PetController";
import app from "../config/server";
import Router from "express";

const petRoutes = Router();
const petController = new PetController();

// Defines the routes
petRoutes.get('/pets', petController.getAllPets); 

export default petRoutes;