import { Shelter } from "../models/associations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ShelterService {
  public static async getAllShelters(): Promise<Shelter[]> {
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
        status: "Pending",
      });

      console.log("Shelter created:", email);
      return "Shelter not approved";
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

      if (shelter.getStatus() === "Rejected") {
        return "Shelter rejected";
      }
      if (shelter.getStatus() !== "Approved") {
        return "Shelter not approved";
      }

      console.log("Shelter is logged in:", email);
      return shelter.generateToken();
    } catch (error) {
      console.error("Error logging in shelter:", error);
      throw error;
    }
  }

  public static async updateShelter(
    shelterid: number,
    name: string,
    email: string,
    password: string,
    address: string,
    postal_code: number,
    city: string,
    description: string
  ): Promise<string> {
    try {
      const shelter = await Shelter.findOne({ where: { shelterid } });
      if (!shelter) return "Shelter not found";

      const emailExists = await Shelter.findOne({ where: { email } });
      
      if (emailExists) {
        throw new Error("Email already exists");
      }

      if (name) {
        shelter.setName(name);
      }
      if (email) {
        shelter.setEmail(email);
      }
      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        shelter.setPassword(hashedPassword);
      }
      if (address) {
        shelter.setAddress(address);
      }
      if (postal_code) {
        shelter.setPostalCode(postal_code);
      }
      if (city) {
        shelter.setCity(city);
      }
      if (description) {
        shelter.setDescription(description);
      }

      await shelter.save();
      const token = await shelter.generateToken();
      return token;
    } catch (error) {
      console.error("Error updating shelter:", error);
      throw error;
    }
  }

  public static async updateShelterStatus(
    shelterid: number,
    status: string
  ): Promise<Shelter> {
    try {
      const shelter = await Shelter.findOne({
        where: { shelterid: shelterid },
      });
      if (!shelter) {
        throw new Error("Shelter not found");
      }

      await Shelter.update(
        { status: status },
        { where: { shelterid: shelterid } }
      );
      return shelter;
    } catch (error) {
      console.error("Error updating shelter status:", error);
      throw error;
    }
  }
}

export default ShelterService;
