import { User } from "../models/associations";

class UserService {
    public static async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching Users:", error);
        }
    }
}

export default UserService;