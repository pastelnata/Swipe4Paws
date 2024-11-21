import { Moderator } from '../models/associations';

class ModeratorController {
    static async getAllMods () {
        try {
            const mods = await Moderator.findAll();
            return mods;
        } catch (error) {
            console.error("Error fetching mods:", error);
        }
    } 
}

export default ModeratorController;