import { Moderator } from "../models/associations";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

class ModeratorService {
  public static async getAllModerators(): Promise<Moderator[]> {
    try {
      const mods = await Moderator.findAll();
      return mods;
    } catch (error) {
      console.error("Error fetching Moderators:", error);
      throw error;
    }
  }
  static async createModerator(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    try {
      //has the password before saving it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log("Creating moderator with username:", email);
      const newModerator = await Moderator.create({
        username: username,
        email: email,
        password: hashedPassword, //hashed password is stored
      });
      console.log("Moderator created:", email);
      return newModerator.generateToken(); //jwt token generated once moderator is created
    } catch (error) {
      console.error("Error creating moderator:", error);
      throw error;
    }
  }
  //get moderator by id
  public static async getModeratorById(modid: number): Promise<Moderator | null> {
    try {
      const mod = await Moderator.findOne({ where: { modid } });
      return mod;
    } catch (error) {
      console.error("Error fetching moderator by ID", error);
      throw error;
    }
  }
  //allow update moderator info
  public static async updateModerator(
    modid: number,
    username: string,
    email: string,
    password: string,
    updatedData: Partial<Moderator>
    ): Promise<Moderator | null> {
      try {
        const mod = await Moderator.findOne({ where: { modid, username, email, password } });
        if (!mod) return null;

        await mod.update(updatedData);
        return mod;
      } catch (error) {
        console.error("Error updating moderator:", error);
        throw error;
      }
    }
    //login moderator
    public static async loginModerator(email: string, password: string): Promise<String> {
      try {
        const mod = await Moderator.findOne({ where: { email }});
        if (!mod) {
          throw new Error("Moderator not found");
        }
        //compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, mod.getPassword());
        if (!isPasswordValid) {
          throw new Error("Invalid password!");
        }

        console.log("Moderator is logged in:", email);
        return mod.generateToken();
      } catch (error) {
        console.error("Error logging in moderator:", error);
        throw error;
      }
    }
}
export default ModeratorService;
