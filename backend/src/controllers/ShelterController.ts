import { Request, Response } from "express";
import ShelterService from "../services/ShelterServices";

class ShelterController {
    public async getAllShelters (req: Request, res: Response) {
        try {
            const shelters = await ShelterService.getAllShelters();
            res.json(shelters);
        } catch (error) {
            console.error("Error fetching shelters:", error);
        }
    }
}

export default ShelterController;