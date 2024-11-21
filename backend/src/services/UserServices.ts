import { User } from "../models/associations";

class UserService {
    public static async getAllUsers(): Promise<User[]> {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching Users:", error);
            throw error;
        }
    }
}

export default UserService;