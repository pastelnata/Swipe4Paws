import { Router } from "express";
import BehaviorController from "../controllers/BehaviorController";

const behaviorRoutes = Router();
const behaviorController = new BehaviorController();

// Defines the routes
behaviorRoutes.get('/', (req, res) => behaviorController.getAllBehaviors(req, res));

export default behaviorRoutes;