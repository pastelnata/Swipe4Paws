import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController";

const favoriteRoutes = Router();
const favoriteController = new FavoriteController();

// Defines the routes
favoriteRoutes.post('/add', (req, res) => favoriteController.addFavorite(req, res));
favoriteRoutes.delete('/delete', (req, res) => favoriteController.deleteFavorite(req, res));
favoriteRoutes.get('/get', (req, res) => favoriteController.getAllFavorites(req, res));

export default favoriteRoutes;