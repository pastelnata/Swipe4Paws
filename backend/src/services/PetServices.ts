import { Op } from 'sequelize';
import { parseISO, isValid } from 'date-fns';
import { Pet, PetBehavior } from '../models/associations';

class PetService {
    static async getAllPets () {
        try {
            const pets = await Pet.findAll({
                include: [
                    {
                        model: PetBehavior,
                        as: 'behaviors',
                        attributes: ['behavior']
                    }
                ]
            });
            return pets;
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    } 

    static async searchPets(query: string) {
        try {
            // Split the query into individual words, trim each word (removes empty spaces), and filter out empty words
            const searchWords = query.split(' ').map(word => word.trim()).filter(word => word);

            const whereConditions: any[] = [];

            for (const word of searchWords) {
                const validConditions = await this.getValidConditions(word);

                // Add valid conditions to whereConditions if any match is found
                if (validConditions.length > 0) {
                    whereConditions.push({
                        [Op.or]: validConditions
                    });
                }
            }

            console.log('Final whereConditions:', whereConditions);
            // Execute the query and return all matching records
            return await Pet.findAll({
                where: {
                    [Op.or]: whereConditions
                },
                include: [
                    {
                        model: PetBehavior,
                        as: 'behaviors',
                        attributes: ['behavior']
                    }
                ]
            });
        } catch (error) {
            console.error("Error searching pets:", error);
            throw error;
        }
    }

    static async addPet(newPetData: any) {
        try {
            const newPet = await Pet.create(newPetData);
            return newPet;
        } catch (error) {
            console.error("Error adding new pet:", error);
            throw error;
        }
    }

    private static async getValidConditions(word: string): Promise<any[]> {
        const parsedDate = parseISO(word);
        const isValidDate = isValid(parsedDate);

        const searchConditions: any[] = [];

        // Search for the word in the following columns
        searchConditions.push(
            { gender: { [Op.iLike]: `%${word}%` } },
            { race: { [Op.iLike]: `%${word}%` } },
            { name: { [Op.iLike]: `%${word}%` } },
            { type: { [Op.iLike]: `%${word}%` } },
            { '$behaviors.behavior$': { [Op.iLike]: `%${word}%` } }
        );

        // Search for the date in the date_added column (if the query is a date)
        if (isValidDate) {
            searchConditions.push({ date_added: { [Op.eq]: parsedDate } });
        }

        // Search for the word in the age column (if the query is a number)
        if (!isNaN(Number(word))) {
            searchConditions.push({ age: { [Op.eq]: Number(word) } });
        }

        return searchConditions;
    }
}

export default PetService;