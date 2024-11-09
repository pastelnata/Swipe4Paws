import { Request, Response } from "express";
import Pet from "../models/PetModel";

class PetController {
    public async getAllPets (req: Request, res: Response) {
        try {
            const pets = await Pet.findAll();
            res.json(pets);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    }
}

export default PetController;