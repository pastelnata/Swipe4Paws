import PetController from "../controllers/PetController";
import { Router } from "express";
//import express from 'express';
//import client from "../config/database";

const petRoutes = Router();
const petController = new PetController();
//const router = express.Router();

// Defines the routes
petRoutes.get('/', petController.getAllPets);
petRoutes.post('/', petController.addPet);
petRoutes.post('/add', (req, res) => petController.addPet(req, res));
petRoutes.put('/:id', petController.updatePet);
petRoutes.delete('/:id', petController.deletePet);
petRoutes.get('/search', petController.searchPets);

export default petRoutes;