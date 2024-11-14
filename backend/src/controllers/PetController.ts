import { Request, Response } from "express";
import Pet from "../models/PetModel";
import PetService from "../services/PetServices";

class PetController {
    public async getAllPets (req: Request, res: Response) {
        try {
            const pets = await Pet.findAll();
            res.json(pets);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    }

    public async searchPets(req: Request, res: Response) {
        try {
            const query = req.query.q as string;
            const pets = await PetService.searchPets(query);
            res.json(pets);
        } catch (error) {
            console.error("Error searching pets:", error);
            res.json({error :"Error searching pets" });
        }
    }
}

export default PetController;