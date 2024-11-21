import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
    public async getAllUsers (req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Error fetching Users:", error);
        }
    }
}

export default UserController;