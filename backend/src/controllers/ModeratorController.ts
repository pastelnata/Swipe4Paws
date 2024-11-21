import ModeratorService from "../services/ModeratorService";

class ModeratorController {
    async getAllMods () {
        try {
            const mods = await ModeratorService.getAllMods();
            return mods;
        } catch (error) {
            console.error("Error fetching mods:", error);
        }
    }
}

export default ModeratorController;