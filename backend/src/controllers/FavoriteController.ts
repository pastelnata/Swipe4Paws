import { Request, Response } from "express";
import FavoriteService from "../services/FavoriteServices";

class FavoriteController {
    public async deleteFavorite(req: Request, res: Response): Promise<any> {
      const { petId, userId } = req.body;
      try {
        const result = await FavoriteService.removeFavorite(petId, userId);
        res.status(201).json(result);
      } 
      catch (error) {
        res.status(500).json({ message: 'Error creating favorite', error });
      }
    }
    
    public async addFavorite(req: Request, res: Response): Promise<any> {
      const { petId, userId } = req.body;
      try {
        const result = await FavoriteService.addFavorite(petId, userId);
        res.status(201).json(result);
      } 
      catch (error) {
        res.status(500).json({ message: 'Error creating favorite', error });
      }
    }

  public async getAllFavorites(userId: number, req: Request, res: Response) {
    try {
      const favorites = await FavoriteService.getAllFavorites(userId);
      res.json(favorites);
    } 
    catch (error) {
      console.error("Error getting favorites:", error);
    }
  }
}

export default FavoriteController;
  