import { Op } from "sequelize";
import { Request, Response } from "express";
import Shelter from "../models/ShelterModel";
import PetBehavior from "../models/PetBehaviorModel";
import Pet from "../models/PetModel";
import { isValid, parseISO } from 'date-fns';

class PetService {
    public static async searchPets(query: string) {
        try {
            query = query ? query.trim() : '';
            const parsedDate = parseISO(query);
            const isValidDate = isValid(parsedDate);

            const whereConditions: any[] = [
                { gender: { [Op.like]: `%${query}%` } },
                { race: { [Op.like]: `%${query}%` } },
                { name: { [Op.like]: `%${query}%` } },
            ];

            if (isValidDate) {
                whereConditions.push({ date_added: { [Op.eq]: parsedDate } });
            }

            if (!isNaN(Number(query))) {
                whereConditions.push({ age: { [Op.eq]: Number(query) } });
            }

            return await Pet.findAll({
                where: {
                    [Op.or]: whereConditions
                },
                include: [
                    { 
                        model: Shelter,
                        attributes: ['city', 'address', 'postal_code', 'name'],
                    },
                    { 
                        model: PetBehavior,
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