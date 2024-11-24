import { Shelter } from "../models/associations";

class ShelterService {
  public static async getAllShelters() {
    try {
      const shelters = await Shelter.findAll();
      return shelters;
    } catch (error) {
      console.error("Error fetching shelters:", error);
      throw error;
    }
  }

  static async createShelter(
    name: string,
    email: string,
    password: string,
    address: string,
    postal_code: number,
    city: string
  ): Promise<string> {
    try {
      console.log("Creating shelter", email);

      const existingShelter = await Shelter.findOne({
        where: { email: email },
      });
      if (existingShelter) {
        throw new Error("Email already exists");
      }

      const newShelter = await Shelter.create({
        name: name,
        email: email,
        password: password,
        address: address,
        postal_code: postal_code,
        city: city,
        status: "Approved",
      });

      console.log("Shelter created:", email);
      return newShelter.generateToken();
    } catch (error) {
      console.error("Error creating shelter:", error);
      throw error;
    }
  }
}

export default ShelterService;
