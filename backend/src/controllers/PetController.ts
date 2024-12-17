import { Request, Response } from "express";
import Pet from "../models/PetModel";
import PetService from "../services/PetServices";
import PetBehavior from "../models/PetBehaviorModel";

class PetController {
  public async getAllPets(req: Request, res: Response) {
    try {
      const pets = await PetService.getAllPets();
      res.json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }


/*public async addPet(req: Request, res: Response) {
    try {
      const pet = await Pet.create(req.body);
      res.json(pet);
      // Extract the id from the created pet
      const createdPetId = pet.petid;
      console.log("Created Pet ID:", createdPetId);

      //Extract the behaviors from the request
      console.log("Created pet behavior", req.body.behaviors);
      const addedPetBehaviors = req.body.behaviors

      // Iterate the list of behaviors from request and 
      // add to the behaviors list with petID
      for (const behavior of addedPetBehaviors) {
        await PetBehavior.create({ petid: createdPetId, behavior: behavior });
      }

    } catch (error) {
      console.error("Error adding pet:", error);
    }
  }
*/
  //update call
  public async updatePet(req: Request, res: Response) {
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
  public async deletePet(req: Request, res: Response) {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }
      await pet.destroy();
      res.json({ message: "Pet deleted successfully" });
    } catch (error) {
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
      res.json({ error: "Error searching pets" });
    }
  }

  public async addPet(req: Request, res: Response) {
    try {
      const newPet = req.body;

      if (!newPet.shelterid) {
        return res.status(400).json({ message: 'Shelter ID is required' });
      }

      const pet = await PetService.addPet(newPet);
      res.status(201).json(pet);
    } catch (error) {
      console.error("Error adding pet:", error);
      res.status(500).json({ error: "Failed to add pet" });
    }
  }
}

export default PetController;
