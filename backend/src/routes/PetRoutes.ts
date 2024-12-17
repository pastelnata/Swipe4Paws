import PetController from "../controllers/PetController";
import { Router } from "express";
import { isShelter } from "../middleware/auth";

const petRoutes = Router();
const petController = new PetController();
//const router = express.Router();

// Defines the routes
petRoutes.get('/', petController.getAllPets);
petRoutes.post('/', isShelter, petController.addPet);
petRoutes.put('/:id', isShelter, petController.updatePet);
petRoutes.delete('/:id', isShelter, petController.deletePet);
petRoutes.get('/search', petController.searchPets);
petRoutes.put('/update', (req, res) => petController.updatePet(req,res));
petRoutes.get('/:id', (req, res) => petController.getPetById(req, res));

export default petRoutes;