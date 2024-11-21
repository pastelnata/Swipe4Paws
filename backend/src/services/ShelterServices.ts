import { Shelter } from '../models/associations';

class ShelterService {
    public static async getAllShelters() {
        try {
            const shelters = await Shelter.findAll();
            return shelters;
        } catch (error) {
            console.error("Error fetching shelters:", error);
            throw error;
        }
    }
}

export default ShelterService;