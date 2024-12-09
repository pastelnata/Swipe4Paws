import { Shelter } from "../models/associations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  public static async getShelterById(id: number) {
    try {
      const shelter = await Shelter.findOne({ where: { shelterid: id } });
      return shelter;
    } catch (error) {
      console.error("Error fetching shelter by id", error);
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
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
        password: hashedPassword,
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
  //get shelter by id
  static async getSheltersById(shelterid: number): Promise<Shelter | null> {
    try {
      const shelter = await Shelter.findOne({ where: { shelterid } });
      return shelter;
    } catch (error) {
      console.error("Error fetching shelter by ID", error);
      throw error;
    }
  }
  //allow update shelter info
  public static async updateShelter(
    shelterid: number,
    name: string,
    email: string,
    password: string,
    address: string,
    postal_code: number,
    city: string,
    updatedData: Partial<Shelter>
  ): Promise<Shelter | null> {
    try {
      const shelter = await Shelter.findOne({
        where: { shelterid, name, email, password, address, postal_code, city },
      });
      if (!shelter) return null;

      await shelter.update(updatedData);
      return shelter;
    } catch (error) {
      console.error("Error updating shelter:", error);
      throw error;
    }
  }
  //login shelter
  public static async loginShelter(
    email: string,
    password: string
  ): Promise<String> {
    try {
      //check if exists by email and password
      const shelter = await Shelter.findOne({ where: { email } });
      if (!shelter) {
        throw new Error("Shelter not found");
      }
      //compare hashed passwords
      const isPasswordValid = await bcrypt.compare(
        password,
        shelter.getPassword()
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password!");
      }

      console.log("Shelter is logged in:", email);
      return shelter.generateToken();
    } catch (error) {
      console.error("Error logging in shelter:", error);
      throw error;
    }
  }
}

export default ShelterService;
