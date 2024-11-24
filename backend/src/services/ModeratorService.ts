import { Moderator } from "../models/associations";

class ModeratorService {
  public static async getAllMods(): Promise<Moderator[]> {
    try {
      const mods = await Moderator.findAll();
      return mods;
    } catch (error) {
      console.error("Error fetching mods:", error);
      throw error;
    }
  }
}

export default ModeratorService;
