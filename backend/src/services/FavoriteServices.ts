import { Favorite } from "../models/associations";

class FavoriteService {
  public static async getAllFavorites(): Promise<Favorite[]> {
    try {
      const favorites = await Favorite.findAll();
      return favorites;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  }

  public static async addFavorite(
    petid: number,
    userid: number
  ): Promise<string> {
    try {
      console.log("Adding favorite:", { petid, userid });
      const newFavorite = await Favorite.create(
        {
          petid: petid,
          userid: userid
        }
      );
      console.log("Favorite added.");
      return "Favorite added succesfully.";
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  }

  public static async removeFavorite(
    petid: number,
    userid: number
  ): Promise<string> {
    try {
      console.log("Deleting favorite:", { petid, userid });
      const favorite = await Favorite.destroy({
        where: {
        petid: petid,
        userid: userid
        }
      });
      console.log("Favorite deleted.");
      return "Favorite deleted succesfully.";
    } catch (error) {
      console.error("Error deleting favorite:", error);
      throw error;
    }
  }
}

export default FavoriteService;
