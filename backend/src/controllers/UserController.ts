import { Request, Response } from "express";
import UserService from "../services/UserServices";


class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  }

//create a new user
  public async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, preferences } = req.body;
      const token = await UserService.createUser(username, email, password, preferences);
      console.log(preferences);
      console.log('token (controller)', token);
      res.json({token});
    } catch (error) {
      console.error("Error creating user:", error);
      res.json("Error creating user");
    }
  }
  //login a user
  public async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body; // Extract credentials from request
      console.log("Login request received for:", username);

      const userData = await UserService.loginUser(username, password); // Validate credentials
      if (!userData) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      res.status(200).json(userData); // Respond with user data (e.g., token)
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Error logging in user" });
    }
  }
}

export default UserController;
