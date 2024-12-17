import { Request, Response } from "express";
import PetBehavior from "../models/PetBehaviorModel";

class BehaviorController {
  // Get all behaviors
    public async getAllBehaviors(req: Request, res: Response) {
      try {
        const behaviors = await PetBehavior.findAll();
        res.json(behaviors);
      } catch (error) {
        console.error("Error fetching behaviors:", error);
      }
    }

    //add behavior used in petcontroller when adding pets.
    public async addBehavior(req: Request, res: Response) {
      try {
        const behavior = await PetBehavior.create(req.body);
        res.json(behavior);
      } catch (error) {
        console.error("Error adding behavior:", error);
      }
    }

    //Update call
    public async updateBehavior(req: Request, res: Response) {
      try {
        const behavior = await PetBehavior.findByPk(req.params.id);
        if (!behavior) {
          return res.status(404).json({ error: "Behavior not found!" });
        }
        await behavior.update(req.body);
        res.json(behavior);
      } catch (error) {
        console.error("Error updating behavior:", error);
      }
    }

}



export default BehaviorController;