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
      console.log("token:", token);
      console.log(preferences);
      res.json(token);
    } catch (error) {
      console.error("Error creating user:", error);
      res.json("Error creating user");
    }
  }
}

export default UserController;
