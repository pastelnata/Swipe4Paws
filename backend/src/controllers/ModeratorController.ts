import { Request, Response } from "express";
import ModeratorService from "../services/ModeratorService";

class ModeratorController {
  public async getAllMods(req: Request, res: Response) {
    try {
      const mods = await ModeratorService.getAllModerators();
      res.status(200).json(mods); //send 200ok status with mods data
    } catch (error) {
      console.error("Error fetching moderators:", error);
      res.status(500).json({ message: "Error fetching mods" }); //send 500status error message
    }
  }
  //create new Moderator
  
  //login moderator
  //logout moderator
}

export default ModeratorController;
