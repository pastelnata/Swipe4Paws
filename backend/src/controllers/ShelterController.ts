import { Request, Response } from "express";
import ShelterService from "../services/ShelterServices";

class ShelterController {
  public async getAllShelters(req: Request, res: Response) {
    try {
      const shelters = await ShelterService.getAllShelters();
      res.json(shelters);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    }
  }

  public async getShelterById(req: Request, res: Response) {
    try{
      const shelterId = parseInt(req.params.id, 10); // Convert `id` to a number
      if (isNaN(shelterId)) {
        return res.status(400).json({ error: "Invalid shelter ID" });
      }
      const shelter = await ShelterService.getShelterById(shelterId);
      res.json(shelter);
    } catch (error) {
      console.error("Error fetching shelter:", error);
    }
  }

  public async createShelter(req: Request, res: Response) {
    try {
      console.log(
        "Creating shelter in backend:",
        req.body.email,
        req.body.name,
        req.body.address,
        req.body.postal_code,
        req.body.city
      );
      const { name, email, password, address, postal_code, city } = req.body;
      const token = await ShelterService.createShelter(
        name,
        email,
        password,
        address,
        postal_code,
        city
      );
      console.log("token:", token);
      res.json(token);
    } catch (error) {
      console.error("Error creating shelter:", error);
      res.json("Error creating shelter");
    }
  }
}

export default ShelterController;
