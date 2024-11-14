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
    //update call
    public async updatePet (req: Request, res: Response) {
        try {
            const pet = await Pet.findByPk(req.params.id);
            if (!pet) {
                return res.status(404).json({ error: "Pet not found" });
            }
            await pet.update(req.body);
            res.json(pet);
        } catch (error) {
            console.error("Error updating pet:", error);
        }
    }
    //delete call
    public async deletePet (req: Request, res: Response) {
        try {
            const pet = await Pet.findByPk(req.params.id);
            if (!pet) {
                return res.status(404).json({ error: "Pet not found" });
            }
            await pet.destroy();
            res.json({ message: "Pet deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting pet:", error);
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

    public async addPet (req: Request, res: Response) {
        try {
            const pet = await Pet.create(req.body);
            res.json(pet);
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    }
}

export default PetController;