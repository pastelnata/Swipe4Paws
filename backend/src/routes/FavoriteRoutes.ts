import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController";
import { isUser } from "../middleware/auth";

const favoriteRoutes = Router();
const favoriteController = new FavoriteController();

// Defines the routes
favoriteRoutes.post('/add', isUser, (req, res) => favoriteController.addFavorite(req, res));
favoriteRoutes.delete('/delete', isUser, (req, res) => favoriteController.deleteFavorite(req, res));
favoriteRoutes.get('/get', isUser, (req, res) => favoriteController.getAllFavorites(req, res));

export default favoriteRoutes;