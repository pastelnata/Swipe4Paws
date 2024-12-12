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

    public async addBehavior(req: Request, res: Response) {
      try {
        const behavior = await PetBehavior.create(req.body);
        res.json(behavior);
      } catch (error) {
        console.error("Error adding behavior:", error);
      }
    }

}



export default BehaviorController;