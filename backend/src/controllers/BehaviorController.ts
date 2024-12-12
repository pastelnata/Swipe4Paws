import { Request, Response } from "express";
import PetBehavior from "../models/PetBehaviorModel";

class BehaviorController {
    public async getAllBehaviors(req: Request, res: Response) {
      try {
        const behaviors = await PetBehavior.findAll();
        res.json(behaviors);
      } catch (error) {
        console.error("Error fetching behaviors:", error);
      }
    }
}

export default BehaviorController;