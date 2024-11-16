import { Op } from 'sequelize';
import { Pet, PetBehavior } from '../models/associations';
import { parseISO, isValid } from 'date-fns';

class PetService {
    static async searchPets(query: string) {
        try {
            // splits the querry into an array, then trisms any white space from each member, then removes any empty strings
            const searchWords = query.split(' ').map(term => term.trim()).filter(term => term);

            const whereConditions: any[] = [];

            // searches each word in the searchWords array
            for (const word of searchWords) {
                //checks if the word is a valid date
                const parsedDate = parseISO(word);
                const isValidDate = isValid(parsedDate);

                const searchWordConditions: any[] = [];

                // searches for the word in the following columns
                searchWordConditions.push(
                    { gender: { [Op.iLike]: `%${word}%` } },
                    { race: { [Op.iLike]: `%${word}%` } },
                    { name: { [Op.iLike]: `%${word}%` } },
                    { type: { [Op.iLike]: `%${word}%` } },
                    { '$behaviors.behavior$': { [Op.iLike]: `%${word}%` } }
                );

                // searches for the date in the date_added column (if the query is a date)
                if (isValidDate) {
                    searchWordConditions.push({ date_added: { [Op.eq]: parsedDate } });
                }


                // searches for the word in the age column (if the query is a number)
                if (!isNaN(Number(word))) {
                    searchWordConditions.push({ age: { [Op.eq]: Number(word) } });
                }

                // Adds searchWord conditions to whereConditions if any match is found
                whereConditions.push({
                    [Op.or]: searchWordConditions
                });
            }

            return await Pet.findAll({
                where: {
                    [Op.and]: whereConditions
                },
                include: [
                    { 
                        model: PetBehavior,
                        as: 'behaviors',
                        attributes: ['behavior'],
                    },
                ]
            });
        } catch (error) {
            console.error("Error searching pets:", error);
        }
    }
}

export default PetService;