import { Request, Response } from "express";
import ModeratorService from "../services/ModeratorService";

class ModeratorController {
  public async getAllMods(req: Request, res: Response) {
    try {
      const mods = await ModeratorService.getAllMods();
      res.json(mods);
    } catch (error) {
      console.error("Error fetching moderators:", error);
    }
  }
}

export default ModeratorController;
