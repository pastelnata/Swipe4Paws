import { Request, Response } from "express";
import Shelter from "../models/ShelterModel";

class ShelterController {
    public async getAllShelters (req: Request, res: Response) {
        try {
            const shelters = await Shelter.findAll();
            res.json(shelters);
        } catch (error) {
            console.error("Error fetching shelters:", error);
        }
    }
}

export default ShelterController;