import { Request, Response } from "express";
import ShelterService from "../services/ShelterServices";

class ShelterController {
  public async getAllShelters(req: Request, res: Response) {
    try {
      const shelters = await ShelterService.getAllShelters();
      res.json(shelters);
      res.status(200).json(shelters); //send 200ok status with shelter data
    } catch (error) {
      console.error("Error fetching shelters:", error);
      res.status(500).json({message: "Error fetching shelters"}); //send 500ok error message
    }
  }

  //get shelter by ID
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

  //create a new shelter 
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
      res.json({token});
    } catch (error) {
      console.error("Error creating shelter:", error);
      res.json("Error creating shelter");
    }
  }
  //login a shelter
  public async loginShelter(req: Request, res: Response){
    try {
      const { name, email, password, address} = req.body; // extract credentials from request
      console.log("Login request received for:",  name, email, password, address);

      const token = await ShelterService.loginShelter(email, password); // Validate credentials
      if (!token) {
        return res.status(401).json({ message: "Invalid name, email, password or address" });
      }
      res.status(200).json(token); //respond with shelter data(token)
    } catch (error) {
      console.error("Error logging in shelter:", error);
      res.status(500).json({ message: "Error logging in shelter" });
    }
  }
  //logout a shelter
  public logoutShelter(req: Request, res: Response): void {
    res.status(200).json({ message: "Successfully logged out. Please remove your token from the client." });
  }
}

export default ShelterController;
