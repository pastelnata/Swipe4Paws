import { Router } from "express";
import BehaviorController from "../controllers/BehaviorController";

const behaviorRoutes = Router();
const behaviorController = new BehaviorController();

// Defines the routes
behaviorRoutes.get('/', (req, res) => behaviorController.getAllBehaviors(req, res));
behaviorRoutes.post('/add', (req, res) => behaviorController.addBehavior(req, res));
behaviorRoutes.put('/update/:id', (req, res) => behaviorController.updateBehavior(req, res));

export default behaviorRoutes;